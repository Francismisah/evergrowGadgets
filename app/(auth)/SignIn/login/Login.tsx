'use client';
import React, { useState } from 'react'
import Button from './Button';
import Image from "next/image";
import Link from "next/link"; 

const Login = () => {
  

   return (
    <div className="min-h-screen bg-pattern-3 bg-no-repeat bg-blend-multiply bg-red-800 bg-opacity-70  bg-cover bg-center  flex items-center justify-center p-4"> {/* Dark green background */}
      <div className="bg-white rounded-2xl shadow-xl flex max-w-5xl lg:w-full overflow-hidden">
        {/* Left Column - Login Form */}
        <div className="lg:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Welcome back!<span role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className="text-gray-600 mb-6">Please enter your details.</p>

<Button
            type="button"
            title="Log in with Apple"
            icon="/apple.png"
            variant="w-full bg-black border border-gray-300 rounded-xl py-4 flex items-center justify-center gap-2 mb-4 font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          />
          <Button
            type="button"
            title="Log in with Google"
            icon="/google.png"
            variant="w-full border border-gray-300 rounded-xl py-4 flex items-center justify-center gap-2 mb-4 font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          />
          

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"/>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"/>
          </div>

          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl py-4 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {/* Replace with actual envelope SVG icon */}
           <Image
                                                 src="/mail.svg"
                                                 width={60}
                                                 height={50}
                                                 alt={""} className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"/>
          </div>
         
         
        
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl py-4 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {/* Replace with actual lock SVG icon */}
          <Image
                                                 src="eye.svg"
                                                 width={60}
                                                 height={50}
                                                 alt={""}
                                                 className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"/>
          </div>

        

          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2 accent-orange-500" />
              Remember for 30 days
            </label>
            <a href="#" className="text-orange-500 hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-orange-500 text-white font-semibold py-4 rounded-xl hover:bg-orange-600 transition-colors">
            Log in
          </button>

          <p className="text-center text-gray-700 mt-6">
            Don't have an account?{' '}
             <Link
                      href='/signUp'
                     className="text-orange-500 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:block lg:block md:w-1/2 lg:w-1/2">
           <Image
                                                 src="/sign.jpg"
                                                 width={600}
                                                 height={500}
                                                 alt={""}
            className="w-full h-full  object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Login


