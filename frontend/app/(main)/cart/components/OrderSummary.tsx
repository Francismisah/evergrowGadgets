"use client";

import React, { useState } from "react";

interface OrderSummaryProps {
  subtotal: number;
  // Change prop signature: now passes the final amount
  onProceedToPaymentClick: (finalAmount: number) => void;
  disablePaymentButton: boolean;
}

const DELIVERY_FEE = 3000; // Fixed delivery fee in Naira

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  onProceedToPaymentClick,
  disablePaymentButton,
}) => {
  const [applyPromoDiscount, setApplyPromoDiscount] = useState(false); // State for the 40% discount toggle

  const calculatedDiscountAmount = applyPromoDiscount ? subtotal * 0.4 : 0;
  const finalTotal = subtotal - calculatedDiscountAmount + DELIVERY_FEE;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>{" "}
      {/* Discount Toggle Option */}
      <div className="my-6 pb-4 border-b border-gray-200">
        <label
          htmlFor="promo-discount-toggle"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              type="checkbox"
              id="promo-discount-toggle"
              className="sr-only" // Hide default checkbox
              checked={applyPromoDiscount}
              onChange={() => setApplyPromoDiscount(!applyPromoDiscount)}
            />
            {/* The switch "track" */}
            <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
            {/* The switch "thumb" */}
            <div
              className={`dot absolute left-1 top-1  w-6 h-6 rounded-full transition transform
                ${
                  applyPromoDiscount
                    ? "translate-x-6 bg-green-600"
                    : "bg-gray-500"
                }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Apply 60% Installmental Payment
          </div>
        </label>
      </div>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Product Total</span>
          <span className="font-medium">₦{subtotal.toFixed(2)}</span>
        </div>

        {/* Dynamic Discount Row */}
        {calculatedDiscountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>2nd Installment (40%)</span>
            <span className="font-medium">
              -₦{calculatedDiscountAmount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Delivery Fee Row */}
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-medium">₦{DELIVERY_FEE.toFixed(2)}</span>
        </div>

        {/* Total Row */}
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2 border-gray-200">
          <span>Total</span>
          <span>₦{finalTotal.toFixed(2)}</span>
        </div>
      </div>
      <button
        type="button"
        // Pass finalTotal when the button is clicked
        onClick={() => onProceedToPaymentClick(finalTotal)}
        disabled={disablePaymentButton}
        className={`px-8 py-3 my-4 w-full rounded-md font-semibold transition-colors duration-200
          ${disablePaymentButton
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
      >
        Proceed To Make Payment
      </button>
    </div>
  );
};

export default OrderSummary;