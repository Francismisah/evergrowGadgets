"use client";
import Image from "next/image";
import { useState, useEffect } from "react"; // Import useEffect
import Button from "./Button";

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  review: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className=" m-4  flexCenter items-left object-left  justify-left flex-col  text-left border-none rounded-lg"
    >
      <div className="py-16 px-10 bg-gray-200  rounded-xl hover:shadow-sm hover:shadow-gray-100  ">
        <Image
          src={product.img}
          width={150}
          height={150}
          alt={""}
        />
      </div>
      <div className="text-left my-2">
        <h3 className="bold-16 lg:bold-20 text-black my-2">{product.name}</h3>
        <div className="flex flex-row gap-24 my-2">
          <p className="medium-14 flexCenter  text-gray-500">
            <Image
              src="/star.png"
              width={200}
              height={150}
              alt={""}
              className="w-4"
            />
            {product.review}
          </p>
          <p className="bold-16 lg:bold-18 text-black ">${product.price}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-row md:flex-row gap-8 my-2">
        <Button
          type="button"
          title="Add to Cart"
          icon="/shopping.svg"
          variant="btn_green1"
        />
        <Button
          type="button"
          title="Buy Now"
          icon=""
          variant="btn_green2"
        />
      </div>
    </div>
  );
};

const products: Product[] = [
  { id: 1, img: "/r7.png", name: "Lenovo IdeaPad", price: 24.99, review: "4.8(2.2k Reviews)" },
  { id: 2, img: "/r1.png", name: "Lenovo IdeaPad", price: 27.99, review: "4.8(2.2k Reviews)" },
  { id: 3, img: "/r9.png", name: "Lenovo IdeaPad", price: 35.99, review: "4.8(2.2k Reviews)" },
  { id: 4, img: "/hp1.png", name: "Hp EliteBook", price: 20.99, review: "5.0(1.2k Reviews)" },
  { id: 5, img: "/r17.png", name: "Dell XRP", price: 19.99, review: "5.0(1.2k Reviews)" },
  { id: 6, img: "/r15.png", name: "Lenovo ThinkPad", price: 15.99, review: "4.8(2.2k Reviews)" },
  { id: 7, img: "/r2.png", name: "Lenovo", price: 14.99, review: "4.8(2.2k Reviews)" },
  { id: 8, img: "/r2.png", name: "Lenovo", price: 16.99, review: "4.8(2.2k Reviews)" },
  { id: 9, img: "/r3.png", name: "Lenovo ThinkPad", price: 15.99, review: "4.8(2.2k Reviews)" },
 ];

const NewComputers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the current window width
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width on mount
    setWindowWidth(window.innerWidth);

    // Function to update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine grid columns based on windowWidth
  const getGridColumns = () => {
    if (windowWidth >= 1280) { // xl breakpoint (e.g., 1280px)
      return "repeat(3, minmax(0, 1fr))";
    } else if (windowWidth >= 1024) { // lg breakpoint (e.g., 1024px)
      return "repeat(2, minmax(0, 1fr))";
    } else if (windowWidth >= 768) { // md breakpoint (e.g., 768px)
      return "repeat(2, minmax(0, 1fr))";
    } else if (windowWidth >= 640) { // sm breakpoint (e.g., 640px)
      return "repeat(2, minmax(0, 1fr))";
    } else { // default for small screens (e.g., <640px)
      return "repeat(1, minmax(0, 1fr))";
    }
  };

  // Determine col-span for the "No products" message
  const getColSpan = () => {
    if (windowWidth >= 1280) return 5;
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    if (windowWidth >= 640) return 2;
    return 1; 
  };

  const gridContainerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: getGridColumns(),
    gap: "16px",
    marginBottom: "56px",
  };

  return (
    <section className="max-container my-9">
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="p-3 border border-gray-300 rounded-lg w-1/2 max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={gridContainerStyle} className="flexCenter flex flex-row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p
            className="text-center text-gray-500"
            style={{ gridColumn: `span ${getColSpan()}` }} // Dynamically set col-span
          >
            No products found matching your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewComputers;