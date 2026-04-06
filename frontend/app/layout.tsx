import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'PerceptronCipher | Doc-QA-AI',
  description: 'Advanced Architectural Document Intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#020617] text-slate-200 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
