'use client'

import { useRef, useState } from 'react'
import {
  CloudUpload,
  Database,
  FileText,
  History,
  Plus,
  Settings,
  HardDrive,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/src/lib/utils'


interface SidebarProps {
  setFile: (file: File | null) => void
  currentFile: File | null
}

export default function Sidebar({ setFile, currentFile }: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setIsUploading(true)
    setUploadStatus('idle')

    try {
      // 1. Prepare Multipart Form Data
      const formData = new FormData()
      formData.append('file', selectedFile)

      // 2. Upload to FastAPI
      const response = await fetch('https://doc-qa-ai.onrender.com/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Ingestion failed')

      // 3. Update Local State on Success
      setFile(selectedFile)
      setUploadStatus('success')

      // Reset success icon after 3 seconds
      setTimeout(() => setUploadStatus('idle'), 3000)
    } catch (error) {
      console.error('Upload Error:', error)
      setUploadStatus('error')
      alert('Failed to index document. Ensure the backend is running.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <aside className='w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden shrink-0 font-sans'>
      {/* 1. Header Section */}
      <div className='p-6 border-b border-slate-900'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-8 h-8 bg-white flex items-center justify-center rounded shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
            <Database className='w-5 h-5 text-black' />
          </div>
          <span className='font-space font-black text-xs tracking-tighter text-white'>
            VAULT_ALPHA
          </span>
        </div>

        {/* 2. Ingestion Zone */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            'w-full group relative overflow-hidden rounded-md border p-4 transition-all duration-300',
            isUploading
              ? 'border-slate-700 bg-slate-900/20 cursor-wait'
              : 'border-slate-800 bg-slate-900/50 hover:border-[#ff4f00]/50 hover:bg-slate-900',
          )}
        >
          <div className='relative z-10 flex flex-col items-center gap-2'>
            {isUploading ? (
              <Loader2 className='w-5 h-5 text-[#ff4f00] animate-spin' />
            ) : uploadStatus === 'success' ? (
              <CheckCircle2 className='w-5 h-5 text-green-500' />
            ) : (
              <CloudUpload className='w-5 h-5 text-slate-500 group-hover:text-[#ff4f00] transition-colors' />
            )}
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-widest transition-colors',
                isUploading ? 'text-[#ff4f00]' : 'text-slate-400',
              )}
            >
              {isUploading ? 'Indexing...' : 'Ingest Document'}
            </span>
          </div>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='.pdf,.txt,.docx'
            className='hidden'
          />
        </button>
      </div>

      {/* 3. Navigation / File List */}
      <nav className='flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6'>
        <div>
          <h3 className='text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-2'>
            Active_Assets
          </h3>
          <div className='space-y-1'>
            {currentFile ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex items-center gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-sm'
              >
                <FileText className='w-4 h-4 text-[#ff4f00]' />
                <div className='min-w-0 flex-1'>
                  <p className='text-[10px] font-bold text-slate-200 truncate'>
                    {currentFile.name}
                  </p>
                  <p className='text-[8px] font-mono text-slate-500 uppercase'>
                    {(currentFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </motion.div>
            ) : (
              <p className='px-2 text-[10px] italic text-slate-700 font-mono'>
                No data indexed...
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className='text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-2'>
            System_Navigation
          </h3>
          <div className='space-y-1'>
            <NavItem icon={History} label='Audit History' />
            <NavItem icon={HardDrive} label='Vector Store' />
            <NavItem icon={Plus} label='New Session' />
          </div>
        </div>
      </nav>

      {/* 4. Footer Config */}
      <div className='p-4 border-t border-slate-900 bg-slate-900/20'>
        <button className='flex items-center gap-3 p-3 w-full text-slate-500 hover:text-white transition-colors group'>
          <Settings className='w-4 h-4 group-hover:rotate-90 transition-transform duration-700' />
          <span className='text-[10px] font-bold uppercase tracking-widest'>
            Core_Config
          </span>
        </button>
      </div>
    </aside>
  )
}

function NavItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className='flex items-center gap-3 w-full p-2.5 rounded hover:bg-slate-900 text-slate-500 hover:text-slate-200 transition-all group'>
      <Icon className='w-4 h-4 transition-transform group-hover:scale-110' />
      <span className='text-[10px] font-bold uppercase tracking-wider'>
        {label}
      </span>
    </button>
  )
}