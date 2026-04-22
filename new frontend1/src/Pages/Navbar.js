
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css' 


function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className='navbar-container'>
      <div className='navbar-main'>
        {/* Logo */}
        <div className='brand-logo'>
            minimals
          </div>

        {/* Desktop Links (Hidden on small screens via CSS) */}
        <div className='nav-links desktop-only'>
          <a href='#features'>Features</a>
          <a href='#who'>For Who</a>
          <a href='#how'>How it Works</a>
          <a href='#hero'>Documentation</a>
        </div>

        {/* Desktop Button */}
        <div className='nav-btn desktop-only'>
          <button>
            <a href='#upload'>Upload Docs</a>
          </button>
        </div>

        {/* Hamburger Icon (Visible on mobile/tablet) */}
        <div className='hamburger' onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'top-cross' : ''}`}></div>
          <div className={`bar ${isOpen ? 'mid-fade' : ''}`}></div>
          <div className={`bar ${isOpen ? 'bot-cross' : ''}`}></div>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='mobile-menu'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <a href='#features' onClick={toggleMenu}>
              Features
            </a>
            <a href='#who' onClick={toggleMenu}>
              For Who
            </a>
            <a href='#how' onClick={toggleMenu}>
              How it Works
            </a>
            <a href='#hero' onClick={toggleMenu}>
              Documentation
            </a>
            <button className='mobile-cta'>
              <a href='#upload'>Upload Docs</a>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
