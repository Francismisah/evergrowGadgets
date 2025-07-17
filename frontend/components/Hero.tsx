"use client";
import Image from "next/image";
import Button from "./Button";
import { PEOPLE_URL } from "@/constants";
import { useState, useRef, useEffect } from "react";

interface Slide {
  id: number;
  src: string;
  alt: string;
}
const Hero = () => {
  const slides: Slide[] = [
    {
      id: 1,
      src: "/s3.png",
      alt: "gadgets1",
    },
    {
      id: 2,
      src: "/s1.png",
      alt: "gadgets2",
    },
    {
      id: 3,
      src: "/s2.png",
      alt: "gadgets3",
    },
    {
      id: 4,
      src: "/s6.png",
      alt: "gadgets4",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideIntervalRef = useRef<number | null>(null);
  const slideDuration: number = 10000;

  const showSlide = (index: number): void => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const nextSlide = (): void => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = (): void => {
    showSlide(currentSlide - 1);
  };

  const startAutoSlide = (): void => {
    stopAutoSlide();
    slideIntervalRef.current = window.setInterval(nextSlide, slideDuration);
  };

  const stopAutoSlide = (): void => {
    if (slideIntervalRef.current !== null) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [currentSlide, startAutoSlide]);
  return (
    <section
      className=" md:max-container  lg:max-container mb-12 lg:pt-16
    "
    >
      <div
        className="rounded-b-lg lg:rounded-5xl   padding-container flex-col-reverse md:flex-col flex 
    gap-20 py-12 pb-32 bg-red-950 bg-cover bg-center md:gap-28 lg:py-20 max-container
    xl:flex-row justify-around "
      >
        <div className=" flex flex-1 flex-col xl:w-1/2">
          <h1 className="bold-45 lg:bold-62 text-red-400">
            Experience Gadgets
          </h1>
          <h1 className="bold-45 lg:bold-64 text-white">
            That Works Efficiently!
          </h1>

          <div className="my-11 flex flex-wrap gap-5">
            <span className="flex -space-x-2 overflow-hidden">
              {PEOPLE_URL.map((url) => (
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
            <p className="bold-16 lg:bold-20 text-red-500">
              200k
              <span className="regular-16 lg:regular-20 ml-1 ">
                People Patronized
              </span>
            </p>
          </div>
          <div className="flex flex-col w-full gap-3 sm:flex-row">
            <Button
              type="button"
              title="Shop Now"
              icon="/red.svg"
              variant="btn_red"
            />
          </div>
        </div>
        <div className="relative  flex flex-1 items-start">
          <div className="">
            <div className="bg-transparent md:bg-transparent  lg:bg-red-800 bg-center bg-cover relative   mt-16 px-[10rem] md:px-72 md:py-52 lg:px-72 py-36 lg:py-52 rounded-full text-left  " />
            <div className="absolute  -top-5  right-80 hidden lg:block md:block ">
              <p className="text-white border-2 border-red-800 shadow-sm bg-red-950 px-4 py-4 my-2  rounded-b-lg rounded-tr-md regular-12">
                {" "}
                We offer the best services & goods
              </p>
              <p className="text-white  border-2 border-red-800 shadow-sm bg-red-950 px-4 py-4 my-2  rounded-b-lg rounded-tr-md regular-12">
                We sell affordable used system that feels new
              </p>
              <p className="text-white  border-2 border-red-800 shadow-sm bg-red-950 px-4 py-4 my-2  rounded-b-lg rounded-tr-md regular-12">
                Patronising evergrow gadget is a flex!
              </p>
            </div>

            {/* Slider Container */}

            {/* Slider Items (Images) */}
            {slides.map((slide, index) => (
              <div
                id="imageSlider"
                key={slide.id}
                className={`absolute  top-16 right-10 lg:right-28 overflow-x-hidden w-3/5 flex items-center justify-center  transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                onMouseEnter={stopAutoSlide} // Pause on hover
                onMouseLeave={startAutoSlide} // Resume on mouse leave
              >
                <Image
                  src={slide.src}
                  className="object-cover rounded-lg"
                  alt={slide.alt}
                  width={1500}
                  height={1500}
                />
              </div>
            ))}

            {/* Slider Navigation Dots */}
            <div id="sliderDots" className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer inline-block transition-all duration-300 hover:bg-gray-500 ${
                    index === currentSlide
                      ? "bg-red-600 hover:bg-red-600"
                      : "bg-gray-400"
                  }`}
                  onClick={() => {
                    stopAutoSlide(); // Stop auto-slide when a dot is clicked
                    showSlide(index);
                    startAutoSlide(); // Restart auto-slide after manual interaction
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
