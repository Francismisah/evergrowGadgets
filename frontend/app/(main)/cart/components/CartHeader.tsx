import React from "react";

const CartHeader = () => {
  return (
    <div className="flexCenter flexBetween px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-xl">💳</span>
        <h1 className="text-xl font-semibold">Cart</h1>
      </div>
      <div className="flex items-center space-x-4 text-sm font-medium text-gray-600">
        <button className="px-4 py-2 bg-gray-200 rounded-md flex items-center space-x-1">
          <span>Checkout</span>
          <span className="text-xs">+</span>
        </button>
      </div>
    </div>
  );
};

export default CartHeader;
