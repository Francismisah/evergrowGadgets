"use client";
import React, { useState } from "react";
import { ShippingAddress } from "../types"; // Make sure ShippingAddress type is available
import CardPaymentForm from "./CardPaymentForm"; // Import the CardPaymentForm

// Define the type for the card details that CardPaymentForm will submit
interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void; // For the main modal's back button
  totalPrice: number;
  deliveryAddress?: ShippingAddress;
  onCardPaymentSubmit: (
    details: CardDetails,
    deliveryInfo: ShippingAddress
  ) => void;
  onPayOnDelivery: (deliveryInfo: ShippingAddress) => void;
}

// Define possible views within the PaymentModal
type PaymentView = "options" | "cardForm";

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onBack,
  totalPrice,
  deliveryAddress,
 
  onCardPaymentSubmit, // This is the new prop for final card submission
  onPayOnDelivery,
}) => {
  // State to control which part of the payment flow is currently visible
  const [currentView, setCurrentView] = useState<PaymentView>("options");

  // Reset view when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setCurrentView("options"); // Always start with options when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Function to safely call handlers with delivery info
  const handlePaymentMethodClick = (
    handler: (info: ShippingAddress) => void,
    requiresDeliveryAddress: boolean = true // Most payment methods need address
  ) => {
    if (requiresDeliveryAddress && !deliveryAddress) {
      console.error("Delivery address not available for payment.");
      alert(
        "Error: Delivery address missing. Please go back and confirm your address."
      );
      return;
    }
    // Ensure deliveryAddress is not undefined before passing, if required
    handler(deliveryAddress!); // Use non-null assertion as we checked it above
  };

  const handleCardTransactionOptionClick = () => {
    // Before switching to card form, ensure delivery address is present
    if (!deliveryAddress) {
      alert(
        "Please confirm your delivery address before proceeding with card payment."
      );
      return;
    }
    setCurrentView("cardForm");
  };

  const handleCardFormBack = () => {
    setCurrentView("options"); // Go back to main payment options
  };

  const handleCardFormSubmit = (details: CardDetails) => {
    // This calls the prop passed from CartPage, including delivery info
    if (deliveryAddress) {
      onCardPaymentSubmit(details, deliveryAddress);
      setCurrentView("options"); // Go back to options after submission
      onClose(); // Close the main modal
    } else {
      console.error("Delivery address missing during card form submission.");
      alert("An error occurred: Delivery address missing. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      {currentView === "options" && (
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto relative">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Pick Payment Method
          </h2>

          {/* Display Total (and potentially delivery address summary) */}
          <div className="mb-4 text-center">
            <p className="text-lg text-gray-700">Total Amount:</p>
            <p className="text-3xl font-extrabold text-red-600">
              ₦{totalPrice.toFixed(2)}
            </p>
            {deliveryAddress && (
              <div className="text-sm text-gray-500 mt-2">
                <p>Delivery to: {deliveryAddress.homeAddress}</p>
                <p>
                  {deliveryAddress.lga}, {deliveryAddress.state}
                </p>
              </div>
            )}
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            <button
              onClick={handleCardTransactionOptionClick} // This button now switches the view
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              Pay with Card
            </button>
            <button
              onClick={() => handlePaymentMethodClick(onPayOnDelivery)}
              className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
            >
              Pay on Delivery
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between space-x-4">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {currentView === "cardForm" && (
        <CardPaymentForm
          isOpen={true} // Always true when this view is active
          onClose={onClose} // Close the whole modal
          onBack={handleCardFormBack} // Go back to payment options
          totalPrice={totalPrice}
          onSubmit={handleCardFormSubmit}
        />
      )}
    </div>
  );
};

export default PaymentModal;
