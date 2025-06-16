"use client";
import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link"; 
import Button from "./Button";

const Navbar = () => {
     const [categoriesContent, setCategoriesContent] = useState(false);
  
      const handleCategorySelection =() =>{
          setCategoriesContent(!categoriesContent);
      };
  return (
    <nav className="max-container padding-container mx-auto fixed top-6 right-0 left-0 z-[1000] justify-between">
      <div className="flexCenter   flex items-center gap-24 bg-white rounded-full lg:border-2 lg:border-red-500 py-2">
        <Link
          href="/"
          className="flex items-center justify-center"
        >
          {/* <Image src="/logo.png" alt="logo" width={40} height={40} /> */}
          <div className="flex">
            <h3 className="bold-16 text-red-800">Evergrow</h3>
            <h3 className="bold-16 text-black">Gadgets</h3>
          </div>
        </Link>

        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link // Change button back to Link
                href={link.href} // Use link.href directly for navigation
                // No onClick needed here for page navigation
                className="regular-16 text-gray-50 flex-center cursor-pointer pb-1.5 transition-all hover:font-bold border-2 border-y-transparent border-x-transparent hover:border-b-red-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="lg:flexCenter gap-3 hidden">
         <Link
          href='/signUp'
        >
          <Button
            type="button"
            title="Sign Up/In"
            icon="/user.svg"
            variant="btn_green"
          /></Link>
          
        </div>
        {/* user area */}
        <div className='hidden'>

        </div>
        {/* mobile menu */}
            <section className=' relative'>
         <button  onClick={handleCategorySelection}>
  {categoriesContent ? (
    <div className='flexCenter gap-4 flex-row-reverse lg:hidden'>
    <Image
          src="/icons8.png"
          alt="menu"
          width={50}
          height={50}
          className="inline-block cursor-pointer lg:hidden"
        />  
     
                       </div>     ):( <div  className='flexCenter gap-4 flex-row-reverse lg:hidden'> <Image
          src="/icons8.png"
          alt="menu"
          width={50}
          height={50}
          className="inline-block cursor-pointer lg:hidden"
        /> </div> ) }
                       
       </button>
       
       </section>
       

      </div>

       {categoriesContent && (
            <ul   className='absolute top-14 gap-12 left-0 right-0 ml-2 mb-2 padding-container  justify-around py-12 md:hidden lg:hidden bg-white' >
            <Link
          href="/"
        ><li className="regular-16 text-gray-50 flex-center cursor-pointer my-2 transition-all hover:font-bold border-2 border-y-transparent border-x-transparent hover:border-b-red-700"
        >Home</li> </Link> 
           <Link
          href="/products"
        > <li className="regular-16 text-gray-50 flex-center cursor-pointer my-2  transition-all hover:font-bold border-2 border-y-transparent border-x-transparent hover:border-b-red-700"
        >Shop</li> </Link> 
           <Link
          href="/repairs"
        ><li className="regular-16 text-gray-50 flex-center cursor-pointer my-2   transition-all hover:font-bold border-2 border-y-transparent border-x-transparent hover:border-b-red-700"
        >Repair</li></Link>
           <Link
          href="/signUp"
        ><li className="regular-16 text-gray-50 flex-center cursor-pointer my-2  transition-all hover:font-bold border-2 border-y-transparent border-x-transparent hover:border-b-red-700"
        >sign up</li></Link>
          <Link
          href="/"
        ><li className="regular-16 text-gray-50 flex-center cursor-pointer my-2  transition-all hover:font-bold border-2 border-y-transparent border-x-transparent hover:border-b-red-700"
        >My Orders</li></Link>
           

        </ul>
         )}
    </nav>
  );
};

export default Navbar;