"use client";
import Image from "next/image";
import { useState } from "react";

interface ItemData{
    id: number;
    img: string;
    name: string;
    title: string;
    description: string;
}

const Services = () => {
    const items:ItemData[] = [
        {id:1, img:"/hospital.jpg", name: "Our vision", title:"To truly and easily overcome cancer:", description: "Guided by the truth, that every disese/sickness naturally has a solution (a simple and sustainable cure)." },
        {id:2, img:"/sup.jpg", name: "Our Mission", title:"To expose the truth about cancer,", description: "for people to know, in order to see that 'cancer is truly not a big deal', and all cancer requires is a very simple cure." },
        {id:3, img:"/hero.jpg", name: "The Objective", title:"Beyond overcoming cancer, the objective of this campaign", description: "is to simply help promote global health, where people are empowered with vital truth medicine today." },
        {id:4, img:"/patient.jpg", name: "The Promoters", title:"Still Water int'l  ", description: "is leading this campaign to overcome cancer today." },
    ];

    const [selectedItem, setSelectedItem]= useState<ItemData | null>(null);
    const handleItemClick = (item: ItemData) =>{
        setSelectedItem(item);
    }
  return (
    <section id='scope' className='max-container flexCenter padding-container flex flex-col lg:flex-row justify-around   text-center  py-4 pb-32  '>
        <ul className='text-left justify-center w-1/2'>
            {items.map((item) =>(
                <li 
            key={item.id} onClick={() => handleItemClick(item)} 
            style={{ cursor: 'pointer'}} className=' capitalize py-4 px-16 border-1 border-t-transparent border-b-black border-x-transparent hover:border-b-transparent hover:border-l-green-800 hover:border-4 bold-24 hover:text-green-700 hover:bg-green-300 text-black'>{item.name}</li>
             ))}
                   </ul>
                   {/* right side */}
                   <div className="mx-auto ">
                   <div className="w-3000 padding-container max-container shadow-lg rounded-lg ml-8   shadow-green-500">
                
                    {selectedItem && (
                        <div className="flex flexCenter flex-col lg:flex-row justify-center " style={{  padding: '15px'}}>
                            <Image
                          src={selectedItem.img}
                          width={300}
                          height={200} alt={""}
                          className="mx-4  rounded-lg" />
                            <div className=" block text-left mx-10 space-y-2 justify-center">
                            <h3 className="text-left bold-24 text-green-800">{selectedItem.name}</h3>
                            <p className="bold-14">{selectedItem.title}</p>
                            <p className="regular-14">{selectedItem.description}</p></div>
</div>      
                    )}
                   </div></div>

    </section>
  )
}

export default Services
