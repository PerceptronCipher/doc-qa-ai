

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className='footer-top'>
        {/* Left Section: Brand & Socials */}
        <div className='footer-brand'>
          <div className='brand-logo'>
            minimals
          </div>
          <p className='brand-tagline'>Precision document intelligence.</p>
          <div className='social-links'>
            
            <a
              href='https://x.com/0xminimals?s=2'
              aria-label='Twitter'
              className='social-icon'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            
          </div>
        </div>

        {/* Right Section: Quick Links */}
        <div className='footer-links-container'>
          <h3>Quick Links</h3>
          <ul className='footer-nav'>
            <li>
              <a href='#features'>Features</a>
            </li>
            <li>
              <a href='#how'>How It Works</a>
            </li>
            <li>
              <a href='#who'>Who is it for</a>
            </li>
            <li>
              <a href='#upload'>Get Started</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className='footer-bottom'>
        <p>© {currentYear} BuildON Inc. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
