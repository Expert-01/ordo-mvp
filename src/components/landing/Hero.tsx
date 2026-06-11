import React from 'react'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  // Animation variants
  const titleVariant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  }

  const textVariant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  }

  const buttonVariant = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.6 }
  }

  const cornerTextVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.8 }
  }

  return (
    <>
    <section 
      className="w-full hero pb-3 mb-9"
      style={{
        backgroundImage: 'url("/bgImage.jfif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
     

      <div className="max-w-6xl mx-auto px-6 py-2 text-center text-white relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-medium tracking-tight mb-6 orbitron"
          initial={titleVariant.initial}
          animate={titleVariant.animate}
          transition={titleVariant.transition}
        >
          "Closing the gap between knowledge and expertise"
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl mx-auto text-lg md:text-xl mb-8 opacity-90"
          initial={textVariant.initial}
          animate={textVariant.animate}
          transition={textVariant.transition}
        >
          Helping students transform knowledge into skills, experience, and career opportunities.
        </motion.p>
        
        <motion.a 
          href='/login'
          initial={buttonVariant.initial}
          animate={buttonVariant.animate}
          transition={buttonVariant.transition}
        >
          <div className="flex justify-center ">
            <button className="px-6 py-3 bg-transparent border border-[#E2EEE0] font-semibold shadow-md hover:bg-[#fff] hover:text-green-700 hover:cursor-pointer transition-all duration-300 ease-in-out">Start your journey</button>
          </div>
        </motion.a>

        {/*Bottom Left corner text for the hero section*/}
        <motion.div 
          className="absolute bottom-4 top-[70vh] left-4 text-[20px] opacity-70 w-[300px] text-left"
          initial={cornerTextVariant.initial}
          animate={cornerTextVariant.animate}
          transition={cornerTextVariant.transition}
        >
            <p>Helping students transform knowledge into skills,
                 experience, and career opportunities.
            </p>
        </motion.div>
      </div>
 
    </section>
    </>
  )
}

export default Hero
