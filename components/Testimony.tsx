import Image from 'next/image'


const Testimony = () => {
  return (
   <section id='testimonial' className='max-container padding-container py-10 px-10 my-10  bg-pattern-2 bg-center bg-cover bg-blend-multiply bg-green-700 bg-opacity-70'>
   <h1 className='bold-45 lg:bold-62 text-white text-center my-6 '>Doctors  Testimonials</h1>
   <div className='flex flex-col lg:flex-row flexBetween my-4 gap-8'>
   <div className='block px-24 py-12  text-left bg-white rounded-xl'>
        <div className=' flex flex-col gap-6 lg:flex-row flexCenter mb-12'>
                  <Image
                                  className="inline-block h-16 w-16 rounded-full border-2 border-green-700" 
                                   src="/p2.jpg"
                                  alt="person"
                                  width={200}
                                  height={200}
                                  />
                                  <div className='text-left mx-3'>
                                    <h4 className='bold-16 lg:bold-18 text-black'>Dr. George Mitchell</h4>
                                    <p className='regular-14 lg:regular-14 text black'>Neurologist Pracitioner</p>
                                  </div>
                                  </div>
                <h4 className='bold-16 lg:bold-24 text-black'>Cancer empowers mankind</h4>
                <p className='regular-14 mt-6 text-black xl:max-w-[300px]'>
                  People knowing the truth about cancer, simply empowers mankind against the ongoing ruthless deception and massive financial exploitation by the system.                </p>
                </div>

      <div className='block px-24 py-12  text-left bg-white rounded-xl'>
      
        <div className=' flex flex-col gap-6 lg:flex-row flexCenter mb-12'>
                  <Image
                                  className="inline-block h-16 w-16 rounded-full border-2 border-green-700" 
                                   src="/p1.jpg"
                                  alt="person"
                                  width={200}
                                  height={200}
                                  />
                                  <div className='text-left mx-3'>
                                    <h4 className='bold-16 lg:bold-18 text-black'>Dr Hannah Grey</h4>
                                    <p className='regular-14 lg:regular-14 text black'>Neurologist Pracitioner</p>
                                  </div>
                                  </div>
              <h4 className  ='bold-16 lg:bold-24 text-black'>Changing the cancer perspective</h4>
                <p className='regular-14 mt-6 text-black xl:max-w-[300px]'>
                 first and foremost, people knowing the truth about cancer is to correct or change the wrong perspective and perception
                 of cancer; speaking of the truth which clearly shows that cancerthe ignorantly dreaded disease, is truly not a big deal.           </p>
                </div>


   </div>
   </section>
  )
}

export default Testimony
