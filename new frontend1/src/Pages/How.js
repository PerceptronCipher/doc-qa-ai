// import frame from "../images/Frame13.png";
// import frame1 from "../images/Frame12.png";

// function How() {
//   return (
//     <div className="how" id="how">
//       <div>
//         <h1>How it works</h1>
//       </div>
//       <div className="how-container">
//         <div className="how-cards">
//           <img src={frame} />
//           <h3>Upload document</h3>
//           <p>Add your document, paste text, or import a URL</p>
//         </div>
//         <div className="how-cards">
//           <img src={frame} />
//           <h3>AI understands it</h3>
//           <p>The system processes and indexes your content</p>
//         </div>
//         <div className="how-cards">
//           <img src={frame1} />
//           <h3>Ask Questions</h3>
//           <p>Type anything related to the document</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default How;

import React from 'react'
import { UploadCloud, Cpu, MessageSquare } from 'lucide-react'
import './How.css'

function How() {
  return (
    <section className='how-section' id='how'>
      <div className='how-header'>
        <h1>How it works</h1>
        <div className='header-underline'></div>
      </div>

      <div className='how-container'>
        {/* Step 1 */}
        <div className='how-card'>
          <div className='icon-wrapper'>
            <UploadCloud size={32} strokeWidth={2.5} />
          </div>
          <h3>Upload document</h3>
          <p>Add your document, paste text, or import a URL effortlessly.</p>
          <span className='step-number'>01</span>
        </div>

        {/* Step 2 */}
        <div className='how-card'>
          <div className='icon-wrapper'>
            <Cpu size={32} strokeWidth={2.5} />
          </div>
          <h3>AI understands it</h3>
          <p>
            Our neural engine processes and indexes your content in seconds.
          </p>
          <span className='step-number'>02</span>
        </div>

        {/* Step 3 */}
        <div className='how-card'>
          <div className='icon-wrapper'>
            <MessageSquare size={32} strokeWidth={2.5} />
          </div>
          <h3>Ask Questions</h3>
          <p>Type anything and get cited, accurate answers instantly.</p>
          <span className='step-number'>03</span>
        </div>
      </div>
    </section>
  )
}

export default How