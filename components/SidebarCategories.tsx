"use client";
import React, { useEffect, useState } from 'react';
import NewProducts from './NewProducts'; 
import UsedComputers from './UsedComputers';
import Accessories from './Accessories';
import Image from 'next/image';
import UsedProducts from './UsedProducts';
import NewComputers from './NewComputers';

interface SidebarProps {
    initialCompressed?: boolean;
}

const SidebarCategories: React.FC<SidebarProps> = ({ initialCompressed = false }) => {
    const [isCompressed, setIsCompressed] = useState(initialCompressed);
    const [activeContent, setActiveContent] = useState<string | null>(null);
    const [categoriesContent, setCategoriesContent] = useState(false);

    const handleCategorySelection =() =>{
        setCategoriesContent(!categoriesContent);
    };

   
    const handleCategoryClick = (category: string) => {
        setActiveContent(category);
        // You might want to decompress the sidebar when a category is selected
        // setIsCompressed(false);
    };

    useEffect(() => {
        const storedCompressed = localStorage.getItem("sidebarCompressed");
        if (storedCompressed) {
            setIsCompressed(storedCompressed === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarCompressed', isCompressed.toString());
    }, [isCompressed]);

    const toggleCompress = () => {
        setIsCompressed(!isCompressed);
    };

       const renderContent = () => {
        switch (activeContent) {
            case 'Brand New Laptops':
                return <NewProducts />; 
            case 'Foreign Used Laptops':
                return <UsedProducts/>;
            case 'Brand New Computers':
                return <NewComputers/>;
            case 'Foreign Used Computers':
                return <UsedComputers/>;
            case 'Accessories':
                return <Accessories/>;
                case 'category':
                    return <div>
                        
                    </div>
            default:
                return <div className='flexCenter flex-col'> <p className="text-gray-600 text-center py-10">Select a category to view products.</p>
              <NewProducts /> </div> ;
        }
    };

    return (
        <section className='flex flex-row my-12 max-container mx-4 relative'>
            <aside className={`hidden md:hidden lg:block  padding-container ${isCompressed ? 'compressed' : ''} min-w-[50px] mr-8`}> {/* Added min-width and margin-right for better layout */}
                <section className='justify-around py-12'>
                    <button className='bold-20 my-6 text-black flexCenter gap-28 hover:text-red-700' onClick={toggleCompress}>
                        <span className='text'>{isCompressed ? 'Categories' : 'Categories'}</span>{' '}
                        <span className='p-1 rounded-full w-5 bg-gray-20'>
                            <Image
                                src="/minimize.svg"
                                width={50}
                                height={50}
                                alt={""}
                            />
                        </span>
                    </button>
                    <ul className='gap-4 text-left'>
                        <li
                            className={`bold-16 text-black my-6 flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Brand New Laptops' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Brand New Laptops')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/Brand.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>{isCompressed ? '' : 'Brand New Laptops'}</span>
                            </div>
                        </li>
                        <li
                            className={`bold-16 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Foreign Used Laptops' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Foreign Used Laptops')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/used.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>{isCompressed ? '' : 'Foreign Used Laptops'}</span>
                            </div>
                        </li>
                        <li
                            className={`bold-16 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Brand New Computers' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Brand New Computers')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/computer.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>{isCompressed ? '' : 'Brand New Computers'}</span>
                            </div>
                        </li>
                        <li
                            className={`bold-16 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Foreign Used Computers' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Foreign Used Computers')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/computers.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>{isCompressed ? '' : 'Foreign Used Computers'}</span>
                            </div>
                        </li>
                        <li
                            className={`bold-18 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Accessories' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Accessories')}
                        >
                            <div className='flexCenter gap-2 ml-3'>
                                <span>
                                    <Image
                                        src="/plus.svg"
                                        width={40}
                                        height={30}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className=''>{isCompressed ? '' : 'Accesories'}</span>
                            </div>
                        </li>
                    </ul>
                </section>
            </aside>

            {/* mobile categories */}
            <section className='absolute -top-20  left-11 ml-2 mb-2  justify-around py-12 md:hidden lg:hidden'>
                    <button  onClick={handleCategorySelection}>
                            {categoriesContent ? (
                            <div className='bold-20 my-6 text-black flexCenter gap-28 hover:text-red-700'> <span className='text'>Categories</span>{' '}
                        <span className='p-1 rounded-full w-5 bg-gray-20'>
                            <Image
                                src="/minimize.svg"
                                width={20}
                                height={20}
                                alt={""}
                            />
                        </span></div>):(   <div className='bold-20 my-6 text-black flexCenter gap-28 hover:text-red-700'> <span className='text'>Categories</span>{' '}
                        <span className='p-1 rounded-full w-5 bg-gray-20'>
                            <Image
                                src="/minimize.svg"
                                width={50}
                                height={50}
                                alt={""}
                            />
                        </span></div>) }
                       
                    </button>
                    {categoriesContent && (<ul className='gap-4 text-left bg-white'>
                        <li
                            className={`bold-16 text-black my-6 flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Brand New Laptops' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Brand New Laptops')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/Brand.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>Brand New Laptops</span>
                            </div>
                        </li>
                        <li
                            className={`bold-16 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Foreign Used Laptops' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Foreign Used Laptops')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/used.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>Foreign Used Laptops</span>
                            </div>
                        </li>
                        <li
                            className={`bold-16 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Brand New Computers' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Brand New Computers')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/computer.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>Brand New Computers</span>
                            </div>
                        </li>
                        <li
                            className={`bold-16 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Foreign Used Computers' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Foreign Used Computers')}
                        >
                            <div className='flexCenter'>
                                <span>
                                    <Image
                                        src="/computers.png"
                                        width={60}
                                        height={50}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className='text'>Foreign Used Computers</span>
                            </div>
                        </li>
                        <li
                            className={`bold-18 my-6 text-black flex flex-row gap-2 hover:text-red-700 cursor-pointer ${activeContent === 'Accessories' ? 'font-bold text-green-700' : ''}`}
                            onClick={() => handleCategoryClick('Accessories')}
                        >
                            <div className='flexCenter gap-2 ml-3'>
                                <span>
                                    <Image
                                        src="/plus.svg"
                                        width={40}
                                        height={30}
                                        alt={""}
                                    />
                                </span>{' '}
                                <span className=''>Accessories</span>
                            </div>
                        </li>
                    </ul>)}
                    
                </section>
            <section className='flex-1'> 
                <div className='min-h-screen'>
                    {renderContent()}
                </div>
            </section>
        </section>
    );
};

export default SidebarCategories;