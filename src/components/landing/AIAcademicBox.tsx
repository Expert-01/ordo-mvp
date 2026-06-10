import React from 'react'

const AIAcademicBox: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="rounded-md p-8" style={{backgroundColor:'var(--ordo-green-800)', color:'white'}}>
        <h5 className="text-xl font-bold mb-3">AI ACADEMIC COMPANION</h5>
        <p className="mb-4">Your personal tutor, always available.</p>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>Understand difficult concepts</li>
          <li>Get personalized study plans</li>
          <li>Track deadlines & progress</li>
          <li>Receive real-time feedback</li>
        </ul>
      </div>
    </section>
  )
}

export default AIAcademicBox
