'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Sparkles,
  Terminal,
  User,
  Cpu,
  Loader2,
  Globe,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/src/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
  
export default function ChatInterface({ fileActive }: { fileActive: boolean }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 1. Resolve Backend URL
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'https://doc-qa-ai.onrender.com'

  const handleSend = async () => {
    if (!input.trim() || !fileActive || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    try {
      // 2. Construct Multipart Form Data for FastAPI Form(...)
      const formData = new FormData()
      formData.append('question', currentInput)

      const response = await fetch('https://doc-qa-ai.onrender.com/ask', {
        method: 'POST',
        body: formData,
        // Browser automatically sets Content-Type: multipart/form-data with boundary
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Uplink Timeout')

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
        },
      ])
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `### ⨯ PROXY_ERROR\n**Target:** ${backendUrl}\n**Status:** Failed to reach neural core. Ensure the Render instance isn't "spun down" (cold start).`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className='flex flex-col h-full bg-slate-950/20 border-l border-slate-800/40 font-sans relative'>
      {/* Technical Header */}
      <header className='p-4 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-xl flex items-center justify-between shrink-0 z-20'>
        <div className='flex items-center gap-2.5'>
          <Globe className='w-3.5 h-3.5 text-[#ff4f00] animate-pulse' />
          <span className='text-[9px] font-black uppercase tracking-[0.25em] text-slate-200'>
            Live_Edge_Node
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-[7px] font-mono text-slate-500'>STATUS:</span>
          <span className='text-[8px] font-mono text-green-500 uppercase font-bold tracking-tighter'>
            Connected_SSL
          </span>
        </div>
      </header>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className='flex-1 overflow-y-auto p-4 md:p-6 space-y-8 custom-scrollbar'
      >
        {/* ... (Previous messages.map logic) ... */}
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={cn(
              'flex gap-3 max-w-[92%]',
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto',
            )}
          >
            <div
              className={cn(
                'px-4 py-3 rounded-2xl text-[11px] prose prose-invert max-w-none ring-1 ring-inset',
                msg.role === 'user'
                  ? 'bg-slate-800/30 ring-slate-700/40'
                  : 'bg-slate-900/50 ring-slate-800/80',
              )}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Terminal */}
      <footer className='p-4 bg-slate-950 border-t border-slate-800/40 shrink-0'>
        <div className='relative max-w-4xl mx-auto'>
          <input
            type='text'
            disabled={!fileActive || isTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              fileActive
                ? 'Uplink to Render core...'
                : 'SOURCE_REQUIRED_FOR_UPLINK'
            }
            className='w-full bg-slate-900/40 border border-slate-800/60 rounded-xl py-3 px-5 text-[11.5px] font-mono text-slate-100 focus:ring-1 focus:ring-[#ff4f00]/30 transition-all'
          />
        </div>
      </footer>
    </div>
  )
}
