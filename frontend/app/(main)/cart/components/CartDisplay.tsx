"use client";

import { useCart } from "@/app/context/CartContext";
import React from "react";
import CartItem from "./CartItem";


const CartDisplay: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
  } = useCart();

  // The variable 'isCheckoutDisabled' was assigned a value but never used
  // within this component. To resolve the error, it has been removed.
  // If a checkout button exists in a parent component that needs to be
  // disabled based on the cart's emptiness, that logic should be handled
  // in the parent component, potentially by passing getCartItemCount()
  // or cart.length to it.

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">
        Your Shopping Cart ({getCartItemCount()} items)
      </h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                {/* Render the CartItem component for each item */}
                <CartItem
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>₦{getCartTotal().toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDisplay;