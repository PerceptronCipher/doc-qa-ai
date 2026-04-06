// 'use client'

// import { useState, useEffect } from 'react'
// import dynamic from 'next/dynamic'
// import {
//   PanelLeftClose,
//   Shield,
//   FileText,
//   MessageSquare,
//   Eye,
//   Menu,
//   X,
// } from 'lucide-react'
// import ChatInterface from '@/components/ChatInterface'
// import Sidebar from '@/components/Sidebar'
// import { cn } from '@/src/lib/utils'

// const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
//   ssr: false,
//   loading: () => (
//     <div className='h-full flex flex-col items-center justify-center text-slate-700'>
//       <div className='w-1.5 h-1.5 rounded-full bg-[#ff4f00] animate-ping mb-4' />
//       <p className='text-[10px] font-black uppercase tracking-widest opacity-20'>
//         Initializing_PDF_Engine...
//       </p>
//     </div>
//   ),
// })

// export default function Dashboard() {
//   const [file, setFile] = useState<File | null>(null)
//   const [isSidebarOpen, setSidebarOpen] = useState(true)
//   const [activeTab, setActiveTab] = useState<'pdf' | 'chat'>('pdf')

//   // Automatically collapse sidebar on smaller screens initially
//   useEffect(() => {
//     if (window.innerWidth < 1024) {
//       setSidebarOpen(false)
//     }
//   }, [])

//   return (
//     <main className='flex h-screen overflow-hidden bg-[#020617] text-slate-200'>
//       {/* 1. Technical Sidebar (Mobile Overlay + Desktop Fixed) */}
//       <div
//         className={cn(
//           'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0',
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
//         )}
//       >
//         <Sidebar
//           setFile={(f) => {
//             setFile(f)
//             if (window.innerWidth < 1024) setSidebarOpen(false)
//           }}
//           currentFile={file}
//         />
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden'
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <div className='flex-1 flex flex-col min-w-0'>
//         {/* 2. Top Navigation Bar */}
//         <header className='h-14 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-900/50 backdrop-blur-xl shrink-0'>
//           <div className='flex items-center gap-2 lg:gap-4'>
//             <button
//               onClick={() => setSidebarOpen(!isSidebarOpen)}
//               className='p-2 -ml-2 text-slate-500 hover:text-white transition-colors'
//             >
//               {isSidebarOpen ? (
//                 <X className='w-5 h-5 lg:hidden' />
//               ) : (
//                 <Menu className='w-5 h-5' />
//               )}
//               <PanelLeftClose className='hidden lg:block w-5 h-5' />
//             </button>
//             <div className='flex items-center gap-2'>
//               <Shield className='w-4 h-4 text-[#ff4f00]' />
//               <h1 className='text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]'>
//                 doc-qa-ai{' '}
//                 <span className='hidden xs:inline text-slate-600 ml-1'>
//                   v1.0
//                 </span>
//               </h1>
//             </div>
//           </div>

//           {/* Mobile Tab Switcher */}
//           <div className='flex lg:hidden bg-slate-800/50 rounded-lg p-1 border border-slate-700'>
//             <button
//               onClick={() => setActiveTab('pdf')}
//               className={cn(
//                 'px-3 py-1 rounded-md transition-all',
//                 activeTab === 'pdf'
//                   ? 'bg-slate-700 text-[#ff4f00]'
//                   : 'text-slate-500',
//               )}
//             >
//               <Eye className='w-4 h-4' />
//             </button>
//             <button
//               onClick={() => setActiveTab('chat')}
//               className={cn(
//                 'px-3 py-1 rounded-md transition-all',
//                 activeTab === 'chat'
//                   ? 'bg-slate-700 text-[#ff4f00]'
//                   : 'text-slate-500',
//               )}
//             >
//               <MessageSquare className='w-4 h-4' />
//             </button>
//           </div>

//           <div className='hidden sm:flex items-center gap-3'>
//             <div className='px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2'>
//               <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
//               <span className='text-[8px] lg:text-[9px] font-bold text-green-500 uppercase'>
//                 Engine_Online
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* 3. The Split Workspace */}
//         <div className='flex-1 flex overflow-hidden relative'>
//           {/* Left: PDF Space (Hidden on mobile if Chat is active) */}
//           <section
//             className={cn(
//               'flex-1 border-r border-slate-800 bg-slate-950/50 overflow-y-auto custom-scrollbar transition-all duration-300',
//               activeTab === 'chat' ? 'hidden lg:block' : 'block',
//             )}
//           >
//             {file ? (
//               <PDFViewer file={file} />
//             ) : (
//               <EmptyState title='No Document Active' icon={FileText} />
//             )}
//           </section>

//           {/* Right: AI Intelligence Space (Full screen on mobile if active) */}
//           <section
//             className={cn(
//               'bg-slate-900/30 flex flex-col transition-all duration-300',
//               'w-full lg:w-[400px] xl:w-[450px]',
//               activeTab === 'pdf' ? 'hidden lg:flex' : 'flex',
//             )}
//           >
//             <ChatInterface fileActive={!!file} />
//           </section>
//         </div>
//       </div>
//     </main>
//   )
// }

// function EmptyState({ title, icon: Icon }: { title: string; icon: any }) {
//   return (
//     <div className='h-full flex flex-col items-center justify-center text-slate-700 p-8 text-center'>
//       <Icon className='w-12 h-12 mb-4 opacity-10' />
//       <p className='text-[10px] font-black uppercase tracking-widest opacity-20'>
//         {title}
//       </p>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  PanelLeftClose,
  Shield,
  FileText,
  MessageSquare,
  Eye,
  Menu,
  X,
  History,
  Terminal,
} from 'lucide-react'
import ChatInterface from '@/components/ChatInterface'
import Sidebar from '@/components/Sidebar'
import HistoryView from '@/components/HistoryView' // New Component
import { cn } from '@/src/lib/utils'

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className='h-full flex flex-col items-center justify-center text-slate-700'>
      <div className='w-1.5 h-1.5 rounded-full bg-[#ff4f00] animate-ping mb-4' />
      <p className='text-[10px] font-black uppercase tracking-widest opacity-20'>
        Initializing_PDF_Engine...
      </p>
    </div>
  ),
})

// Types for navigation
type ViewMode = 'chat' | 'history'

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'pdf' | 'intel'>('pdf') // For mobile toggle
  const [currentView, setCurrentView] = useState<ViewMode>('chat') // For content toggle

  // Automatically collapse sidebar on smaller screens initially
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [])

  return (
    <main className='flex h-screen overflow-hidden bg-[#020617] text-slate-200'>
      {/* 1. Technical Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar
          setFile={(f) => {
            setFile(f)
            if (window.innerWidth < 1024) setSidebarOpen(false)
          }}
          currentFile={file}
          // Pass navigation controls to Sidebar
          onNavigate={(view: ViewMode) => {
            setCurrentView(view)
            setActiveTab('intel') // On mobile, jump to intelligence space
            if (window.innerWidth < 1024) setSidebarOpen(false)
          }}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className='flex-1 flex flex-col min-w-0'>
        {/* 2. Top Navigation Bar */}
        <header className='h-14 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-900/50 backdrop-blur-xl shrink-0'>
          <div className='flex items-center gap-2 lg:gap-4'>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className='p-2 -ml-2 text-slate-500 hover:text-white transition-colors'
            >
              {isSidebarOpen ? (
                <X className='w-5 h-5 lg:hidden' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
              <PanelLeftClose className='hidden lg:block w-5 h-5' />
            </button>
            <div className='flex items-center gap-2'>
              <Shield className='w-4 h-4 text-[#ff4f00]' />
              <h1 className='text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]'>
                doc-qa-ai{' '}
                <span className='hidden xs:inline text-slate-600 ml-1'>
                  v1.0
                </span>
              </h1>
            </div>
          </div>

          {/* Mobile Tab Switcher (PDF vs Intelligence) */}
          <div className='flex lg:hidden bg-slate-800/50 rounded-lg p-1 border border-slate-700'>
            <button
              onClick={() => setActiveTab('pdf')}
              className={cn(
                'px-3 py-1 rounded-md transition-all',
                activeTab === 'pdf'
                  ? 'bg-slate-700 text-[#ff4f00]'
                  : 'text-slate-500',
              )}
            >
              <Eye className='w-4 h-4' />
            </button>
            <button
              onClick={() => setActiveTab('intel')}
              className={cn(
                'px-3 py-1 rounded-md transition-all',
                activeTab === 'intel'
                  ? 'bg-slate-700 text-[#ff4f00]'
                  : 'text-slate-500',
              )}
            >
              {currentView === 'history' ? (
                <History className='w-4 h-4' />
              ) : (
                <MessageSquare className='w-4 h-4' />
              )}
            </button>
          </div>

          {/* Desktop Status Indicators */}
          <div className='hidden sm:flex items-center gap-4'>
            <div className='flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800'>
              <Terminal size={12} className='text-slate-500' />
              <span className='text-[8px] font-mono text-slate-400 uppercase tracking-tighter'>
                Mode: {currentView.toUpperCase()}
              </span>
            </div>
            <div className='px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
              <span className='text-[8px] lg:text-[9px] font-bold text-green-500 uppercase'>
                Engine_Online
              </span>
            </div>
          </div>
        </header>

        {/* 3. The Split Workspace */}
        <div className='flex-1 flex overflow-hidden relative'>
          {/* Left Panel: PDF Viewer */}
          <section
            className={cn(
              'flex-1 border-r border-slate-800 bg-slate-950/50 overflow-y-auto custom-scrollbar transition-all duration-300',
              activeTab === 'intel' ? 'hidden lg:block' : 'block',
            )}
          >
            {file ? (
              <PDFViewer file={file} />
            ) : (
              <EmptyState title='No Document Active' icon={FileText} />
            )}
          </section>

          {/* Right Panel: Intelligence Space (Chat or History) */}
          <section
            className={cn(
              'bg-slate-900/30 flex flex-col transition-all duration-300',
              'w-full lg:w-[400px] xl:w-[450px]',
              activeTab === 'pdf' ? 'hidden lg:flex' : 'flex',
            )}
          >
            <div className='flex-1 overflow-hidden'>
              {currentView === 'chat' ? (
                <ChatInterface fileActive={!!file} />
              ) : (
                <HistoryView />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function EmptyState({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <div className='h-full flex flex-col items-center justify-center text-slate-700 p-8 text-center'>
      <Icon className='w-12 h-12 mb-4 opacity-10' />
      <p className='text-[10px] font-black uppercase tracking-widest opacity-20'>
        {title}
      </p>
    </div>
  )
}