// 'use client'

// import { useRef, useState } from 'react'
// import {
//   CloudUpload,
//   Database,
//   FileText,
//   History,
//   Plus,
//   Settings,
//   HardDrive,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
//   XCircle,
// } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { cn } from '@/src/lib/utils'

// interface SidebarProps {
//   setFile: (file: File | null) => void
//   currentFile: File | null
// }

// export default function Sidebar({ setFile, currentFile }: SidebarProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [uploadStatus, setUploadStatus] = useState<
//     'idle' | 'success' | 'error'
//   >('idle')

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0]
//     if (!selectedFile) return

//     setIsUploading(true)
//     setUploadStatus('idle')

//     try {
//       const formData = new FormData()
//       formData.append('file', selectedFile) // Matches FastAPI UploadFile = File(...)

//       const backendUrl =
//         process.env.NEXT_PUBLIC_BACKEND_URL || 'https://doc-qa-ai.onrender.com'

//       // 2. Upload to FastAPI
//       const response = await fetch('https://doc-qa-ai.onrender.com/upload', {
//         method: 'POST',
//         body: formData,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.detail || 'Ingestion failed')
//       }

//       setFile(selectedFile)
//       setUploadStatus('success')
//       // Auto-reset status after success feedback
//       setTimeout(() => setUploadStatus('idle'), 3000)
//     } catch (error) {
//       console.error('Vault_Error:', error)
//       setUploadStatus('error')
//     } finally {
//       setIsUploading(false)
//       // Reset input so same file can be re-uploaded if needed
//       if (fileInputRef.current) fileInputRef.current.value = ''
//     }
//   }

//   const clearAsset = () => {
//     setFile(null)
//     setUploadStatus('idle')
//   }

//   return (
//     <aside className='w-full sm:w-72 lg:w-64 border-r border-slate-800/60 bg-slate-950 flex flex-col h-full overflow-hidden shrink-0 font-sans shadow-2xl'>
//       {/* 1. Brand Identity */}
//       <div className='p-6 border-b border-slate-900 bg-slate-950/50'>
//         <div className='flex items-center gap-3 mb-8'>
//           <div className='w-8 h-8 bg-white flex items-center justify-center rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
//             <Database className='w-4 h-4 text-black' />
//           </div>
//           <div className='flex flex-col'>
//             <span className='font-black text-[11px] tracking-tighter text-white leading-none'>
//               VAULT_ALPHA
//             </span>
//             <span className='text-[7px] font-bold text-[#ff4f00] tracking-[0.4em] mt-1 uppercase'>
//               Render_Core_v2
//             </span>
//           </div>
//         </div>

//         {/* 2. Ingestion Zone */}
//         <button
//           onClick={() => fileInputRef.current?.click()}
//           disabled={isUploading}
//           className={cn(
//             'w-full group relative overflow-hidden rounded-xl border p-5 transition-all duration-500',
//             isUploading
//               ? 'border-[#ff4f00]/30 bg-[#ff4f00]/5 cursor-wait'
//               : uploadStatus === 'success'
//                 ? 'border-green-500/40 bg-green-500/5'
//                 : 'border-slate-800/80 bg-slate-900/40 hover:border-[#ff4f00]/40 hover:bg-slate-900/60',
//           )}
//         >
//           <div className='relative z-10 flex flex-col items-center gap-2'>
//             {isUploading ? (
//               <Loader2 className='w-5 h-5 text-[#ff4f00] animate-spin' />
//             ) : uploadStatus === 'success' ? (
//               <CheckCircle2 className='w-5 h-5 text-green-500' />
//             ) : uploadStatus === 'error' ? (
//               <AlertCircle className='w-5 h-5 text-red-500 animate-pulse' />
//             ) : (
//               <CloudUpload className='w-5 h-5 text-slate-500 group-hover:text-[#ff4f00] transition-colors' />
//             )}

//             <span
//               className={cn(
//                 'text-[9px] font-black uppercase tracking-[0.2em]',
//                 isUploading
//                   ? 'text-[#ff4f00]'
//                   : 'text-slate-400 group-hover:text-slate-200',
//               )}
//             >
//               {isUploading
//                 ? 'SYNTHESIZING...'
//                 : uploadStatus === 'error'
//                   ? 'RETRY_UPLINK'
//                   : 'INGEST_SOURCE'}
//             </span>
//           </div>
//           <input
//             type='file'
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept='.pdf,.txt,.docx'
//             className='hidden'
//           />
//         </button>
//       </div>

//       {/* 3. Assets & Navigation */}
//       <nav className='flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar'>
//         <section>
//           <div className='flex items-center justify-between px-2 mb-4'>
//             <h3 className='text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]'>
//               ACTIVE_CACHE
//             </h3>
//             {currentFile && (
//               <button
//                 onClick={clearAsset}
//                 className='hover:text-red-500 transition-colors'
//               >
//                 <XCircle
//                   size={10}
//                   className='text-slate-700 hover:text-red-500'
//                 />
//               </button>
//             )}
//           </div>

//           <AnimatePresence mode='wait'>
//             {currentFile ? (
//               <motion.div
//                 key='active-file'
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 10 }}
//                 className='flex items-center gap-3 p-4 bg-slate-900/40 border border-[#ff4f00]/10 rounded-xl'
//               >
//                 <div className='p-2 bg-slate-800 rounded-lg text-[#ff4f00] shadow-[0_0_10px_rgba(255,79,0,0.1)]'>
//                   <FileText size={14} />
//                 </div>
//                 <div className='min-w-0 flex-1'>
//                   <p className='text-[10px] font-bold text-slate-200 truncate'>
//                     {currentFile.name.toUpperCase()}
//                   </p>
//                   <p className='text-[7px] font-mono text-[#ff4f00] uppercase mt-0.5 tracking-tighter'>
//                     SECURE_UPLINK_STABLE
//                   </p>
//                 </div>
//               </motion.div>
//             ) : (
//               <div className='px-2 py-6 border border-dashed border-slate-800/40 rounded-xl text-center'>
//                 <p className='text-[8px] font-bold text-slate-700 uppercase tracking-widest'>
//                   No Active Vectors
//                 </p>
//               </div>
//             )}
//           </AnimatePresence>
//         </section>

//         <section className='space-y-1'>
//           <h3 className='text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 px-2'>
//             NAV_INTERFACE
//           </h3>
//           <NavItem icon={History} label='Audit History' />
//           <NavItem icon={HardDrive} label='Vector Storage' />
//           <NavItem
//             icon={Plus}
//             label='Reset Session'
//             onClick={() => window.location.reload()}
//           />
//         </section>
//       </nav>

//       {/* 4. Settings Footer */}
//       <div className='p-4 border-t border-slate-900 bg-slate-900/10'>
//         <button className='flex items-center gap-3 p-3 w-full text-slate-600 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition-all group'>
//           <Settings className='w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500' />
//           <span className='text-[9px] font-black uppercase tracking-widest'>
//             CONFIG_KERNEL
//           </span>
//         </button>
//       </div>
//     </aside>
//   )
// }

// function NavItem({
//   icon: Icon,
//   label,
//   onClick,
// }: {
//   icon: any
//   label: string
//   onClick?: () => void
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className='flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-900/50 text-slate-500 hover:text-slate-200 transition-all group'
//     >
//       <Icon className='w-3.5 h-3.5 opacity-50 group-hover:opacity-100' />
//       <span className='text-[9px] font-bold uppercase tracking-widest'>
//         {label}
//       </span>
//     </button>
//   )
// }

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
  AlertCircle,
  XCircle,
  LucideIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/src/lib/utils'

// 1. Updated Interface
interface SidebarProps {
  setFile: (file: File | null) => void
  currentFile: File | null
  onNavigate: (view: 'chat' | 'history') => void // Added this
}

export default function Sidebar({
  setFile,
  currentFile,
  onNavigate,
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type !== 'application/pdf') {
      setUploadStatus('error')
      return
    }

    setIsUploading(true)
    setUploadStatus('idle')
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', selectedFile)

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'https://doc-qa-ai.onrender.com'

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100)
        setUploadProgress(percentComplete)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setFile(selectedFile)
        setUploadStatus('success')
        // Switch to chat view automatically on successful upload
        onNavigate('chat')
        setTimeout(() => {
          setUploadStatus('idle')
          setUploadProgress(0)
        }, 3000)
      } else {
        setUploadStatus('error')
      }
      setIsUploading(false)
    })

    xhr.addEventListener('error', () => {
      setUploadStatus('error')
      setIsUploading(false)
    })

    xhr.open('POST', `${backendUrl}/upload`)
    xhr.send(formData)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const clearAsset = () => {
    setFile(null)
    setUploadStatus('idle')
  }

  return (
    <aside className='w-full sm:w-72 lg:w-64 border-r border-slate-800/60 bg-slate-950 flex flex-col h-full overflow-hidden shrink-0 font-sans shadow-2xl'>
      {/* Brand Identity */}
      <div className='p-6 border-b border-slate-900 bg-slate-950/50'>
        <div
          className='flex items-center gap-3 mb-8 cursor-pointer'
          onClick={() => onNavigate('chat')}
        >
          <div className='w-8 h-8 bg-white flex items-center justify-center rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
            <Database className='w-4 h-4 text-black' />
          </div>
          <div className='flex flex-col'>
            <span className='font-black text-[11px] tracking-tighter text-white leading-none'>
              VAULT_ALPHA
            </span>
            <span className='text-[7px] font-bold text-[#ff4f00] tracking-[0.4em] mt-1 uppercase'>
              Render_Core_v2
            </span>
          </div>
        </div>

        {/* Ingestion Zone */}
        <div className='relative group'>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={cn(
              'w-full relative overflow-hidden rounded-xl border p-5 transition-all duration-500',
              isUploading
                ? 'border-[#ff4f00]/30 bg-[#ff4f00]/5 cursor-wait'
                : uploadStatus === 'success'
                  ? 'border-green-500/40 bg-green-500/5'
                  : 'border-slate-800/80 bg-slate-900/40 hover:border-[#ff4f00]/40 hover:bg-slate-900/60',
            )}
          >
            <div className='relative z-10 flex flex-col items-center gap-2'>
              {isUploading ? (
                <div className='flex flex-col items-center gap-1'>
                  <Loader2 className='w-5 h-5 text-[#ff4f00] animate-spin' />
                  <span className='text-[10px] font-mono text-[#ff4f00] tabular-nums'>
                    {uploadProgress}%
                  </span>
                </div>
              ) : uploadStatus === 'success' ? (
                <CheckCircle2 className='w-5 h-5 text-green-500' />
              ) : uploadStatus === 'error' ? (
                <AlertCircle className='w-5 h-5 text-red-500 animate-pulse' />
              ) : (
                <CloudUpload className='w-5 h-5 text-slate-500 group-hover:text-[#ff4f00] transition-colors' />
              )}

              <span
                className={cn(
                  'text-[9px] font-black uppercase tracking-[0.2em]',
                  isUploading
                    ? 'text-[#ff4f00]'
                    : 'text-slate-400 group-hover:text-slate-200',
                )}
              >
                {isUploading
                  ? 'SYNTHESIZING...'
                  : uploadStatus === 'error'
                    ? 'RETRY_UPLINK'
                    : 'INGEST_SOURCE'}
              </span>
            </div>

            {/* Background Progress Fill */}
            {isUploading && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                className='absolute bottom-0 left-0 h-[2px] bg-[#ff4f00] progress-glow z-20'
              />
            )}

            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='.pdf'
              className='hidden'
            />
          </button>
        </div>
      </div>

      {/* Assets & Navigation */}
      <nav className='flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar'>
        <section>
          <div className='flex items-center justify-between px-2 mb-4'>
            <h3 className='text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]'>
              ACTIVE_CACHE
            </h3>
            {currentFile && (
              <button
                onClick={clearAsset}
                className='hover:text-red-500 transition-colors'
              >
                <XCircle
                  size={10}
                  className='text-slate-700 hover:text-red-500'
                />
              </button>
            )}
          </div>

          <AnimatePresence mode='wait'>
            {currentFile ? (
              <motion.div
                key='active-file'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => onNavigate('chat')} // Jump to chat when clicking active file
                className='flex items-center gap-3 p-4 bg-slate-900/40 border border-[#ff4f00]/10 rounded-xl cursor-pointer hover:bg-slate-900/60 transition-colors'
              >
                <div className='p-2 bg-slate-800 rounded-lg text-[#ff4f00] shadow-[0_0_10px_rgba(255,79,0,0.1)]'>
                  <FileText size={14} />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-[10px] font-bold text-slate-200 truncate uppercase'>
                    {currentFile.name}
                  </p>
                  <p className='text-[7px] font-mono text-[#ff4f00] uppercase mt-0.5 tracking-tighter'>
                    SECURE_UPLINK_STABLE
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className='px-2 py-6 border border-dashed border-slate-800/40 rounded-xl text-center'>
                <p className='text-[8px] font-bold text-slate-700 uppercase tracking-widest'>
                  No Active Vectors
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>

        <section className='space-y-1'>
          <h3 className='text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 px-2'>
            NAV_INTERFACE
          </h3>

          {/* Linked Navigation Items */}
          <NavItem
            icon={History}
            label='Audit History'
            onClick={() => onNavigate('history')}
          />
          <NavItem
            icon={HardDrive}
            label='Vector Storage'
            onClick={() => onNavigate('chat')}
          />
          <NavItem
            icon={Plus}
            label='Reset Session'
            onClick={() => window.location.reload()}
          />
        </section>
      </nav>

      {/* Settings Footer */}
      <div className='p-4 border-t border-slate-900 bg-slate-900/10'>
        <button className='flex items-center gap-3 p-3 w-full text-slate-600 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition-all group'>
          <Settings className='w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500' />
          <span className='text-[9px] font-black uppercase tracking-widest'>
            CONFIG_KERNEL
          </span>
        </button>
      </div>
    </aside>
  )
}

function NavItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className='flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-900/50 text-slate-500 hover:text-slate-200 transition-all group'
    >
      <Icon className='w-3.5 h-3.5 opacity-50 group-hover:opacity-100' />
      <span className='text-[9px] font-bold uppercase tracking-widest'>
        {label}
      </span>
    </button>
  )
}