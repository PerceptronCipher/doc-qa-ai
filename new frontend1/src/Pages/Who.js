// import star from "../images/Star 1.png";

// function How() {
//   return (
//     <div className="who" id="who">
//       <div className="howHeading">Who is it for</div>
//       <div className="howList">
//         <div className="hl">
//           <img src={star} />
//           <li>Students</li>
//         </div>
//         <div className="hl">
//           <img src={star} />
//           <li>AI optimize it</li>
//         </div>
//         <div className="hl">
//           <img src={star} />
//           <li>Legal Teams</li>
//         </div>
//         <div className="hl">
//           <img src={star} />
//           <li>Developers</li>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default How;

import React from 'react'
import { GraduationCap, Scale, Code, BarChart3 } from 'lucide-react'
import './Who.css'

function Who() {
  const targetAudience = [
    {
      icon: <GraduationCap size={24} />,
      title: 'Students',
      text: 'Quickly summarize lectures and find answers in dense academic textbooks.',
    },
    {
      icon: <Scale size={24} />,
      title: 'Legal Teams',
      text: 'Analyze long contracts and identify key clauses without manual scanning.',
    },
    {
      icon: <Code size={24} />,
      title: 'Developers',
      text: 'Query technical documentation and API refs to solve bugs faster.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Researchers',
      text: 'Extract data points and trends from complex financial or scientific reports.',
    },
  ]

  return (
    <section className='who-section' id='who'>
      <div className='who-content'>
        <h2 className='who-heading'>Who is it for?</h2>
        <p className='who-subheading'>
          Designed for anyone handling high volumes of information.
        </p>

        <div className='who-grid'>
          {targetAudience.map((item, index) => (
            <div className='who-item' key={index}>
              <div className='who-icon-box'>{item.icon}</div>
              <div className='who-text-box'>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Who