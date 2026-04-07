// import vector from "../images/Vector.png";

// function Features() {
//   return (
//     <div>
//       <div className="features" id="features">
//         <h1>Features</h1>
//         <p>Built for Speed, Accuracy, and Simplicity</p>
//       </div>

//       <div className="how-container">
//         <div className="features-cards">
//           <img src={vector} />
//           <h3>Context-Aware Answers</h3>
//           <p>Answers are grounded strictly in your document</p>
//         </div>
//         <div className="features-cards">
//           <img src={vector} />
//           <h3>Instant Responses</h3>
//           <p>Get results in seconds</p>
//         </div>
//         <div className="features-cards">
//           <img src={vector} />
//           <h3>Multi-Document Support</h3>
//           <p>Work with multiple files at once</p>
//         </div>
//         <div className="features-cards">
//           <img src={vector} />
//           <h3> Smart Search</h3>
//           <p>Find specific details without scrolling</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Features;

import React from 'react'
import { ShieldCheck, Zap, Files, Search } from 'lucide-react'
import './Features.css'

function Features() {
  const featureList = [
    {
      icon: <ShieldCheck size={28} />,
      title: 'Context-Aware Answers',
      desc: 'Answers are grounded strictly in your document to prevent hallucinations.',
    },
    {
      icon: <Zap size={28} />,
      title: 'Instant Responses',
      desc: 'Experience zero-lag processing with our high-performance inference engine.',
    },
    {
      icon: <Files size={28} />,
      title: 'Multi-Document Support',
      desc: 'Seamlessly cross-reference information across multiple file formats.',
    },
    {
      icon: <Search size={28} />,
      title: 'Smart Search',
      desc: 'Deep-index search that finds the needle in the haystack instantly.',
    },
  ]

  return (
    <section className='features-section' id='features'>
      <div className='features-header'>
        <h1>Features</h1>
        <p>Built for Speed, Accuracy, and Simplicity</p>
      </div>

      <div className='features-grid'>
        {featureList.map((f, index) => (
          <div className='feature-card' key={index}>
            <div className='feature-icon'>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features