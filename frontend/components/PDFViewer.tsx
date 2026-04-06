'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, Activity, FileText } from 'lucide-react'

interface PDFViewerProps {
  file: File | null
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)

    // Clean up memory when the file changes or component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  if (!file || !url) {
    return <EmptyState active={!!file} />
  }

  return (
    <div className='h-full flex flex-col bg-[#020617] overflow-hidden font-sans relative border-l border-slate-800/30'>
      {/* 1. Dashboard Header */}
      <header className='px-4 lg:px-6 py-3 border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl flex justify-between items-center shrink-0 z-10'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <ShieldCheck size={12} className='text-[#ff4f00]' />
            <span className='text-[9px] font-black text-slate-100 uppercase tracking-[0.25em]'>
              Context_Frame
            </span>
          </div>
          <div className='h-3 w-[1px] bg-slate-800' />
          <span className='text-[9px] font-mono text-slate-500 truncate max-w-[200px] lg:max-w-[400px] tracking-tight'>
            {file.name.toUpperCase()}
          </span>
        </div>
        <div className='flex items-center gap-3 opacity-60'>
          <Activity size={12} className='text-slate-700' />
        </div>
      </header>

      {/* 2. Native PDF Workspace (No Canvas Dependencies) */}
      <div className='flex-1 bg-[#020617] relative'>
        <iframe
          src={`${url}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
          className='w-full h-full border-none opacity-90 invert grayscale hue-rotate-180 contrast-125'
          title='PDF_Stream'
        />

        {/* Subtle Overlay to match your dark theme UI */}
        <div className='absolute inset-0 pointer-events-none border-t border-slate-800/20 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]' />
      </div>

      {/* 3. Footer Metadata */}
      <footer className='px-4 py-2 border-t border-slate-900 bg-slate-950/80 flex justify-between items-center'>
        <span className='text-[7px] font-mono text-slate-600 uppercase tracking-widest'>
          Native_System_Render // No_External_Deps
        </span>
        <span className='text-[7px] font-mono text-[#ff4f00] animate-pulse uppercase'>
          Live_Stream
        </span>
      </footer>
    </div>
  )
}

function EmptyState({ active }: { active: boolean }) {
  return (
    <div className='h-full flex flex-col items-center justify-center bg-[#020617] text-center p-12'>
      <div className='w-12 h-12 rounded-full bg-slate-900/50 flex items-center justify-center mb-6 border border-slate-800/50'>
        <FileText
          size={20}
          className={active ? 'text-[#ff4f00] animate-pulse' : 'text-slate-800'}
        />
      </div>
      <h3 className='text-[10px] font-black uppercase tracking-[0.4em] text-slate-600'>
        {active ? 'Initializing_Buffer' : 'Awaiting_Source_Uplink'}
      </h3>
      <p className='mt-2 text-[8px] font-mono text-slate-700 uppercase tracking-tighter'>
        {active
          ? 'Routing file stream to native preview core...'
          : 'Ready for document ingestion'}
      </p>
    </div>
  )
}
