"use client";
import React from 'react';
import Image from 'next/image';
import { ShippingAddress } from '../types';

interface OrderApprovedPageProps {
  deliveryAddress: ShippingAddress;
  totalPrice: number;
}

const OrderApprovedPage: React.FC<OrderApprovedPageProps> = ({ deliveryAddress, totalPrice }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-yellow-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-center max-w-2xl w-full transform transition-all duration-500 scale-100 opacity-100">
        <div className="flex justify-center mb-6">
          <Image
            src="/check-circle.svg" // You might need to add a checkmark SVG to your public folder
            alt="Order Approved"
            width={80}
            height={80}
            className="text-green-500"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-green-700 mb-4 animate-fade-in-up">
          Order Approved!
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate-fade-in-up animation-delay-300">
          Your order has been successfully placed.
        </p>

        <div className="bg-white border border-green-200 rounded-lg p-6 mb-8 text-left shadow-inner animate-fade-in-up animation-delay-600">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Delivery Details:</h2>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Delivery Address:</span> {deliveryAddress.homeAddress}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Area:</span> {deliveryAddress.lga}, {deliveryAddress.state}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Phone Number:</span> {deliveryAddress.phoneNumber}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Total Amount:</span> <span className="font-extrabold text-blue-600">₦{totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-gray-800 mt-4 italic">
            Your cart will be delivered to the address provided.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()} // Simple way to go back to a fresh state
          className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 animate-bounce-in"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderApprovedPage;
