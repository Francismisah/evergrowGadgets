
"use client";
import Image from "next/image";
import Button from "./Button"; // Assuming Button component is in the same directory or adjust path
import { useCart } from "@/app/context/CartContext";

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
  const { addToCart } = useCart(); // Use the useCart hook to get addToCart function

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img, // Pass the image for cart display if needed
    });
  };

  return (
    <div className=" m-4 flexCenter items-left object-left justify-left flex-col text-left border-none rounded-lg">
      <div className="py-16 px-10 bg-gray-200 rounded-xl hover:shadow-sm hover:shadow-gray-100 ">
        <Image src={product.img} width={150} height={150} alt={product.name} />
      </div>
      <div className="text-left my-2">
        <h3 className="bold-16 lg:bold-20 text-black my-2">{product.name}</h3>
        <div className="flex flex-row gap-24 my-2">
          <p className="medium-14 flexCenter text-gray-500">
            <Image
              src="/star.png"
              width={200}
              height={150}
              alt="Star rating"
              className="w-4"
            />
            {product.review}
          </p>
          <p className="bold-16 lg:bold-18 text-black ">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-row md:flex-row gap-8 my-2">
        <Button
          type="button"
          title="Add to Cart"
          icon="/shopping.svg"
          variant="btn_green1"
          onClick={handleAddToCart} // Add onClick handler here
        />
        <Button
          type="button"
          title="Buy Now"
          icon=""
          variant="btn_green2"
          // onClick={() => handleBuyNow(product)} // Add Buy Now logic if needed
        />
      </div>
    </div>
  );
};

export default ProductCard;