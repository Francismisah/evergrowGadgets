
import Image from 'next/image'
import Button from "./Button"
const More = () => {
  return (
    <section  className='max-container padding-container py-12 pb-32 flex flex-col lg:flex-row'>
        <div className=' relative xl:w-1/2 justify-start flex-1  '>
        <div className='bg-green-950   shadow-lg bg-center bg-cover top-9 lg:top-[30px]  absolute left-4 xl:left-16  px-40 py-28  xl:px-60 xl:py-40 rounded-3xl  '/>
 <Image
         src="/doctor.jpg"
         alt="menu"
         width={500}
         height={450}
        className='rounded-3xl  relative border-4 border-green-700'
         />
        </div>
        <div className="xl:w-1/2 my-12">
            <h2 className='uppercase bold-32 text-green-700'>How simple is the cure of cancer</h2>
            <p className='regular-16 mt-6 text-gray-90 xl:max-w-[520px]'> 
                The simple cure for cancer is all based on the fact that, the immune system is the key to the cure for intracellular diseases like cancer. where,
                it is only the immune system, particularly the cytotxic immune cells, that is capable of safetl and effectively carrying out the selective cytotoxiciy
                required as treatment for the cure of intracellular diseases, which drugs are not able to do.
                         </p>
        </div>

    </section>
  )
}

export default More
