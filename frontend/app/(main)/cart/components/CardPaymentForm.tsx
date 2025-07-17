"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";

// Define the interface for the card details to be submitted
interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}

interface CardPaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  totalPrice: number;
  onSubmit: (details: CardDetails) => void;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  isOpen,
  onClose,
  onBack,
  totalPrice,
  onSubmit,
}) => {
  // State for form inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() =>{
    const isValid = 
    cardNumber.trim() !== '' &&
    expiryDate.trim() !== '' &&
    cardHolder.trim()!== '' &&
    cvv.trim()!=='';
    setIsFormValid(isValid);
  }, [cardNumber, expiryDate, cardHolder, cvv])

  if (!isOpen) {
    return null; // Don't render if not open
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all card details.");
      return;
    }

    onSubmit({ cardNumber, expiryDate, cardHolder, cvv });
    setCardNumber("");
    setExpiryDate("");
    setCardHolder("");
    setCvv("");
  };

  return (
    // Overlay for the modal (if used as one)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Main Container / Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6 relative">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go back"
          >
            <Image
              src="/arrow-left.svg" // Adjust path if assets are directly in public
              alt="Back"
              width={24}
              height={24}
            />
          </button>

          {/* Secure Payment Header */}
          <div className="flex items-center space-x-2 flex-grow justify-center -ml-8">
            {" "}
            {/* Adjust margin-left to center */}
            <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
            {/* Using a simple credit card icon, you can replace with Font Awesome or a custom SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-light p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close form"
          >
            &times;
          </button>
        </div>

        {/* Transaction Details Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Number */}
            <div className="form-group col-span-full">
              {" "}
              {/* Card number often spans full width */}
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Expiry Date */}
            <div className="form-group">
              <label
                htmlFor="expiry-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry-date"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* CVV */}
            <div className="form-group">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Card Holder (placed below for better flow if it was initially full-width) */}
            <div className="form-group col-span-full">
              <label
                htmlFor="card-holder"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Holder
              </label>
              <input
                type="text"
                id="card-holder"
                placeholder="Card Holder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Total Display */}
          <div className="mt-6 mb-4 p-4 rounded-md text-center">
            <strong className="text-xl text-gray-800">
              Total:{" "}
              <span className="font-extrabold text-blue-600">
                ₦{totalPrice.toFixed(2)}
              </span>
            </strong>
          </div>

          {/* Approve Button */}
          
          <button
          disabled={!isFormValid}
            type="submit" // Important for form submission
           className={`w-full py-3 px-4 font-semibold rounded-lg transition-colors duration-200 ${
              isFormValid
                ? 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}       >
            Approve Payment
          </button>
        </form>

        {/* Payment Methods Logos */}
        <div className="flex justify-center items-center flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200">
          <Image
            src="/visa.png"
            alt="Visa"
            width={50}
            height={30}
            className="h-8 object-contain"
          />
          <Image
            src="/mastercard.png"
            alt="Mastercard"
            width={50}
            height={30}
            className="h-8 object-contain"
          />
          <Image
            src="/amex.png"
            alt="American Express"
            width={50}
            height={30}
            className="h-8 object-contain"
          />
          <Image
            src="/paypal.png"
            alt="PayPal"
            width={50}
            height={30}
            className="h-8 object-contain"
          />
          <Image
            src="/apple-pay.png"
            alt="Apple Pay"
            width={50}
            height={30}
            className="h-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
