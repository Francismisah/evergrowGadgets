"use client";
import React from 'react';
import Image from 'next/image'; // Assuming Next.js Image component
import { CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void; // Function to remove item
  onUpdateQuantity: (id: number, newQuantity: number) => void; // Function to update quantity
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
      {/* Use item.img as per CartContext definition */}
      <Image src={item.img} alt={item.name} width={60} height={60} className="w-16 h-16 object-cover rounded-md mr-4" />
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-gray-500 text-sm">Item</p> {/* Assuming "Item" is a generic label */}
        <p className="font-semibold text-gray-700">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="text-gray-500 text-lg px-2 py-1 rounded-md hover:bg-gray-100"
        >
          -
        </button>
        <span className="font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="text-gray-500 text-lg px-2 py-1 rounded-md hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="ml-4 text-gray-400 hover:text-red-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;