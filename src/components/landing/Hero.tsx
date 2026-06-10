import React from 'react'

const Hero: React.FC = () => {
  return (
    <>
    <section 
      className="w-full hero pb-35"
      style={{
        backgroundImage: 'url("/bgImage.jfif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
     

      <div className="max-w-6xl mx-auto px-6 py-2 text-center text-white relative z-10">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 orbitron">"Closing the gap between knowledge and expertise"</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 opacity-90">Helping students transform knowledge into skills, experience, and career opportunities.</p>
        <div className="flex justify-center ">
          <button className="px-6 py-3 bg-transparent border border-[#E2EEE0] font-semibold shadow-md hover:bg-[#fff] hover:text-green-700 hover:cursor-pointer transition-all duration-300 ease-in-out">Start your journey</button>
        </div>

        {/*Bottom Left corner text for the hero section*/}
        <div className="absolute bottom-4 top-[70vh] left-4 text-[20px] opacity-70 w-[300px] text-left">
            <p>Helping students transform knowledge into skills,
                 experience, and career opportunities.
            </p>
        </div>
      </div>
 
    </section>
    </>
  )
}

export default Hero
