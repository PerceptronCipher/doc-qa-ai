'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MessageSquare, ChevronRight, Terminal } from 'lucide-react'
import { cn } from '@/src/lib/utils'

interface HistoryItem {
  timestamp: string
  question: string
  answer: string
}

export default function HistoryView() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || 'https://doc-qa-ai.onrender.com'
      const response = await fetch(`${backendUrl}/history`)
      const data = await response.json()
      setHistory(data.reverse()) // Show latest first
    } catch (error) {
      console.error('Failed to sync history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
    // Optional: Poll every 30 seconds to keep in sync
    const interval = setInterval(fetchHistory, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col gap-4 p-4 h-full bg-slate-950/50 rounded-2xl border border-slate-800/40'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-2'>
          <Terminal size={14} className='text-[#ff4f00]' />
          <h2 className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-200'>
            System_Logs / History
          </h2>
        </div>
        <button
          onClick={fetchHistory}
          className='text-[9px] font-bold text-slate-500 hover:text-[#ff4f00] transition-colors'
        >
          [ REFRESH_STREAM ]
        </button>
      </div>

      <div className='flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2'>
        <AnimatePresence mode='popLayout'>
          {isLoading ? (
            <div className='flex items-center justify-center py-10'>
              <span className='text-[9px] font-mono text-slate-600 animate-pulse'>
                READING_DATA_SECTORS...
              </span>
            </div>
          ) : history.length === 0 ? (
            <div className='text-center py-10 border border-dashed border-slate-800 rounded-xl'>
              <p className='text-[9px] text-slate-600 uppercase tracking-widest'>
                No logs found in current session
              </p>
            </div>
          ) : (
            history.map((item, index) => (
              <motion.div
                key={item.timestamp}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='group p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:border-[#ff4f00]/30 transition-all'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <Clock size={10} className='text-slate-500' />
                    <span className='text-[8px] font-mono text-slate-500 uppercase'>
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className='text-[7px] font-black text-[#ff4f00]/60 uppercase tracking-tighter'>
                    Query_ID: {index.toString().padStart(3, '0')}
                  </span>
                </div>

                <div className='space-y-2'>
                  <div className='flex gap-2'>
                    <MessageSquare
                      size={12}
                      className='text-slate-400 mt-0.5 shrink-0'
                    />
                    <p className='text-[11px] font-medium text-slate-200 leading-tight'>
                      {item.question}
                    </p>
                  </div>

                  <div className='pl-5 border-l border-slate-800 mt-2'>
                    <p className='text-[10px] text-slate-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all'>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
