import Image from 'next/image'

const About= () => {
  return (
    <section id='about' className='max-container padding-container justify-center   text-center  py-4 pb-32 lg:py-20 ' >
        <h1 className='bold-40 lg:bold-64 text-left font-serif  text-yellow-500 mb-5'>What You Need To know...</h1>
        <div className='flex flex-col lg:flex-row space-y-2 lg:space-x-2 my-14 items-center justify-center'>
            <div className='block px-8 py-6 text-left bg-green-800 hover:bg-yellow-600 rounded-xl'>
               <Image
                         src="/immune.png"
                         alt="menu"
                         width={50}
                         height={50}
                         className='p-1 rounded-full bg-white w-20 h-20 border-2 border-green-50 m-6'
                         />
            <p className='bold-14 mt-3 text-white xl:max-w-[380px]'>
             For a cure, all that the immune system required (particularly the cytotoxic immune cells), in order to function optimally in effectively dealiing
             with intracellular diseases like cancer, is to be boosted      </p>
            </div>
            <div className='block px-8 py-6  text-left bg-green-800 hover:bg-yellow-600 rounded-xl'>
               <Image
                         src="/basket.png"
                         alt="menu"
                         width={50}
                         height={50}
                         className='p-1 rounded-full bg-white w-20 h-20 border-2 border-green-50 m-6'
                         />
            <p className='bold-14 mt-6 text-white xl:max-w-[350px]'>
             Foods are the best means of boosting these cytotoxic cells of the immune system, which simply makes foods the medicine
             for cure the cure of cancer/intracellular diseases        </p>
            </div>
            <div className='block px-8 py-6 text-left hover:bg-yellow-600 bg-green-800 rounded-xl'>
               <Image
                         src="/lymphatic.png"
                         alt="menu"
                         width={200}
                         height={200}
                        className='p-1 rounded-full bg-white w-20 h-20 border-2 border-green-50 m-6'
                         />
          
            <p className='bold-14 mt-12 text-white xl:max-w-[350px]'>
            Drugs (synthetic medicines)  cannot safely and effectively carry out selective cytotoxicity - the said treatment for the cure of cancer.          </p>
            </div>
          
        </div>
       
    </section>
  )
}

export default About
