"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";


interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  review: string;
}

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

const Accessories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGridColumns = () => {
    if (windowWidth >= 1280) {
      return "repeat(3, minmax(0, 1fr))";
    } else if (windowWidth >= 1024) {
      return "repeat(2, minmax(0, 1fr))";
    } else if (windowWidth >= 768) {
      return "repeat(2, minmax(0, 1fr))";
    } else if (windowWidth >= 640) {
      return "repeat(2, minmax(0, 1fr))";
    } else {
      return "repeat(1, minmax(0, 1fr))";
    }
  };

  const getColSpan = () => {
    if (windowWidth >= 1280) return 3; // Max col-span for 3 columns
    if (windowWidth >= 1024) return 2;
    if (windowWidth >= 768) return 2;
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
            style={{ gridColumn: `span ${getColSpan()}` }}
          >
            No products found matching your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default Accessories;