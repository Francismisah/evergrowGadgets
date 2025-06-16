'use client';
import Image from 'next/image'
import Button from "./Button"
import { PEOPLE_URL } from '@/constants'
import { Carousel } from "flowbite-react";


const Hero = () => {
  return (
    <section
    className=" md:max-container  lg:max-container mb-12 lg:pt-16
    " id='home'> 
    <div className='rounded-b-lg lg:rounded-5xl   padding-container flex-col-reverse md:flex-col flex 
    gap-20 py-12 pb-32 bg-red-950 bg-cover bg-center md:gap-28 lg:py-20 max-container
    xl:flex-row justify-around '>
              
        <div
        className= " flex flex-1 flex-col xl:w-1/2" >
            <h1 className='bold-45 lg:bold-62 text-red-400'>Experience Gadgets</h1>
            <h1 className='bold-45 lg:bold-64 text-white'>That Works Efficiently!</h1>
           
            <div className='my-11 flex flex-wrap gap-5'>
            <span className="flex -space-x-2 overflow-hidden">
            {PEOPLE_URL.map((url) =>(
                <Image
                className="inline-block h-10 w-10 rounded-full" 
                src={url}
                key={url}
                alt="person"
                width={200}
                height={200}
                />
            ))}
          </span>
              <p className= "bold-16 lg:bold-20 text-red-500">200k
                <span className="regular-16 lg:regular-20 ml-1 ">People Patronized</span>
              </p>
            </div>
            <div className= "flex flex-col w-full gap-3 sm:flex-row">
              <Button 
              type= 'button'
              title="Shop Now"
               icon= "/red.svg"
              variant= "btn_red"/>
            </div>
        </div>
<div className="relative  flex flex-1 items-start">
  <div className=''>

 <div className='bg-transparent md:bg-transparent  lg:bg-red-800 bg-center bg-cover relative   mt-16 px-[10rem] md:px-72 md:py-52 lg:px-72 py-36 lg:py-52 rounded-full text-left  '/>
 <div className='absolute  -top-5  right-80 hidden lg:block md:block '>
 <p className='text-white border-2 border-red-800 shadow-sm bg-red-950 px-4 py-4 my-2  rounded-b-lg rounded-tr-md regular-12'> We offer the best services & goods</p>
  <p className='text-white  border-2 border-red-800 shadow-sm bg-red-950 px-4 py-4 my-2  rounded-b-lg rounded-tr-md regular-12'>We sell affordable used system that feels new</p>
  <p className='text-white  border-2 border-red-800 shadow-sm bg-red-950 px-4 py-4 my-2  rounded-b-lg rounded-tr-md regular-12'>Patronising evergrow gadget is a flex!</p>
 
  </div>
 
  <div className=" overflow-x-hidden">
  <Carousel leftControl=" " rightControl=" " slideInterval={3000} className='absolute  top-7 right-10 lg:right-28 overflow-x-hidden w-3/5'>
        <img src="/s3.png" alt="..."  />
        <img src="/s1.png" alt="..."  />
        <img src="/s2.png" alt="..." />
        <img src="/s6.png" alt="..."  />
      </Carousel>
    </div>
 
 </div>
</div>
</div>
    </section>
  )
}

export default Hero
