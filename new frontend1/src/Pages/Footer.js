// import q from "../images/Q&A S.png";
// import framei from "../images/Frame21.png";
// import frame2 from "../images/Frame20.png";
// import frame3 from "../images/Frame19.png";

// function Footer() {
//   return (
//     <div className="footer">
//       <div className="footer-left">
//         <div>
//           <img src={q} alt="Q&A S" />
//         </div>
//         <div>
//           <img src={framei} />
//           <img src={frame2} />
//           <img src={frame3} />
//         </div>
//       </div>

//       <div className="footer-container">
//         <h1>Quick Links</h1>
//         <a href="#">Features</a>
//         <a href="#">Contact</a>
//         <a href="#">AI optimizer</a>
//         <div>@ BuildON Inc. All rights reserve.</div>
//       </div>
//     </div>
//   );
// }

// export default Footer;

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faGithub,
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
            Q&A <span>S</span>
          </div>
          <p className='brand-tagline'>Precision document intelligence.</p>
          <div className='social-links'>
            <a
              href='https://linkedin.com'
              aria-label='LinkedIn'
              className='social-icon'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href='https://instagram.com'
              aria-label='Instagram'
              className='social-icon'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href='https://x.com'
              aria-label='Twitter'
              className='social-icon'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href='https://github.com'
              aria-label='GitHub'
              className='social-icon'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faGithub} />
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
