'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Terminal, User, Cpu, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim() || !fileActive) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      // Prepare the form data for FastAPI
      const formData = new FormData()
      formData.append('question', input)

      const response = await fetch('https://doc-qa-ai.onrender.com/ask', {
        method: 'POST',
        body: formData, // FastAPI Form(...) expects FormData
      })

      const data = await response.json()

      if (response.ok) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMsg])
      } else {
        throw new Error(data.error || 'Failed to fetch answer')
      }
    } catch (error) {
      console.error('Chat Error:', error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Error: Engine connection lost. Ensure the FastAPI backend is running on port 8000.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className='flex flex-col h-full bg-slate-900/20 border-l border-slate-800 font-sans'>
      {/* 1. Chat Header */}
      <div className='p-4 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Sparkles className='w-4 h-4 text-[#ff4f00]' />
          <span className='text-[10px] font-black uppercase tracking-widest text-slate-200'>
            Intelligence_Stream
          </span>
        </div>
        <div className='flex gap-1'>
          <div className='px-2 py-0.5 rounded-sm bg-slate-800 border border-slate-700 text-[8px] text-slate-500 font-mono'>
            GPT-4o
          </div>
        </div>
      </div>

      {/* 2. Message Area */}
      <div
        ref={scrollRef}
        className='flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar'
      >
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center opacity-20 text-center px-8'>
            <Terminal className='w-8 h-8 mb-4' />
            <p className='text-[10px] font-bold uppercase tracking-[0.2em]'>
              {fileActive
                ? 'Awaiting Command...'
                : 'Upload Document to Initialize AI'}
            </p>
          </div>
        )}

        <AnimatePresence mode='popLayout'>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-3 max-w-[90%]',
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto',
              )}
            >
              <div
                className={cn(
                  'w-7 h-7 shrink-0 rounded flex items-center justify-center border transition-all',
                  msg.role === 'user'
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-[#ff4f00] border-[#ff4f00]/50 shadow-[0_0_10px_rgba(255,79,0,0.2)]',
                )}
              >
                {msg.role === 'user' ? (
                  <User className='w-4 h-4 text-slate-400' />
                ) : (
                  <Cpu className='w-4 h-4 text-white' />
                )}
              </div>
              <div
                className={cn(
                  'p-3 rounded-sm text-[11px] leading-relaxed font-medium shadow-sm whitespace-pre-wrap',
                  msg.role === 'user'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700'
                    : 'bg-slate-900 text-slate-300 border border-slate-800',
                )}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className='flex gap-3'>
            <div className='w-7 h-7 bg-[#ff4f00] rounded flex items-center justify-center animate-pulse'>
              <Cpu className='w-4 h-4 text-white' />
            </div>
            <div className='flex items-center gap-1 p-3'>
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className='w-1 h-1 bg-slate-500 rounded-full animate-bounce'
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Input Area */}
      <div className='p-4 bg-slate-900/50 border-t border-slate-800'>
        <div className='relative flex items-center'>
          <input
            type='text'
            disabled={!fileActive || isTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              fileActive
                ? 'Ask PerceptronCipher...'
                : 'Please ingest a document first'
            }
            className='w-full bg-slate-950 border border-slate-800 rounded-md py-3 px-4 pr-12 text-[11px] font-medium text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#ff4f00]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          />
          <button
            onClick={handleSend}
            disabled={!fileActive || !input.trim() || isTyping}
            className='absolute right-2 p-2 text-slate-500 hover:text-[#ff4f00] disabled:opacity-0 transition-all'
          >
            <Send className='w-4 h-4' />
          </button>
        </div>
        <div className='mt-3 flex items-center justify-between px-1'>
          <p className='text-[8px] text-slate-600 font-mono uppercase tracking-widest'>
            Status: {fileActive ? 'Indexed' : 'Standby'}{' '}
            <span className='mx-2'>|</span> Latency: {isTyping ? '...' : '24ms'}
          </p>
          {isTyping && (
            <span className='text-[8px] text-[#ff4f00] font-bold uppercase animate-pulse'>
              Processing_Vector_Search
            </span>
          )}
        </div>
      </div>
    </div>
  )
}