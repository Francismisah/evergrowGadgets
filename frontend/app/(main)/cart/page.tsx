"use client";
import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import CartHeader from "./components/CartHeader";
import CartDisplay from "./components/CartDisplay";
import OrderSummary from "./components/OrderSummary";
import ShippingOptions from "./components/ShippingOptions";
import PaymentModal from "./components/PaymentModal";
import { ShippingAddress } from "./types";
import OrderApprovedPage from "./components/OrderApprovedPage";

// Define the type for the card details that CardPaymentForm will submit
interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}

const CartPage: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [confirmedDeliveryAddress, setConfirmedDeliveryAddress] = useState<
    ShippingAddress | undefined
  >(undefined);
  const [totalAmountToPay, setTotalAmountToPay] = useState<number>(0);
  // New state to control displaying the order approved page
  const [showOrderApprovedPage, setShowOrderApprovedPage] = useState<boolean>(false);

  const { getCartTotal, cart, clearCart } = useCart(); // Assuming clearCart exists in your context

  const subtotal = getCartTotal();

  const disableProceedToPayment = !confirmedDeliveryAddress || cart.length === 0;

  const handleProceedToCheckout = () => {
    console.log(
      "Please fill in your delivery details in the Shipping Details section."
    );
  };

  const handleOpenPaymentModalFromSummary = (finalAmount: number) => {
    if (confirmedDeliveryAddress && cart.length > 0) {
      setTotalAmountToPay(finalAmount);
      setIsPaymentModalOpen(true);
      console.log(
        "Opening Payment Modal from Order Summary with total:",
        finalAmount.toFixed(2)
      );
    } else {
      // Replaced alert with a more user-friendly message if you have a custom modal system
      // For now, keeping alert as per original code, but consider replacing it.
      alert(
        "Please confirm your delivery address and ensure your cart is not empty before proceeding to payment."
      );
    }
  };

  const handleClosePaymentModal = () => setIsPaymentModalOpen(false);
  const handleBackFromPaymentModal = () => setIsPaymentModalOpen(false);

  // This is the new handler for the *final* submission of the CardPaymentForm
  const handleCardPaymentFinalSubmit = (details: CardDetails, deliveryInfo: ShippingAddress) => {
    console.log(
      "Final Card Payment submitted to backend (mock):",
      {
        paymentMethod: "Card",
        cardDetails: details,
        deliveryInfo: deliveryInfo,
        totalAmount: totalAmountToPay.toFixed(2),
      }
    );
    // Simulate sending data to backend
    // In a real application, you would make an API call here.
    // Example: await fetch('/api/process-card-payment', { method: 'POST', body: JSON.stringify(...) });

    // After successful backend processing:
    setIsPaymentModalOpen(false); // Close the payment modal
    clearCart(); // Clear the cart after successful order
    setShowOrderApprovedPage(true); // Show the approved page
  };

  const handlePayOnDelivery = (deliveryInfo: ShippingAddress) => {
    console.log(
      "Pay on delivery selected. Sending order details to backend (mock):",
      {
        paymentMethod: "Pay on Delivery",
        deliveryInfo: deliveryInfo,
        totalAmount: totalAmountToPay.toFixed(2),
      }
    );
    // Simulate sending data to backend
    // In a real application, you would make an API call here.
    // Example: await fetch('/api/place-cod-order', { method: 'POST', body: JSON.stringify(...) });

    // After successful backend processing:
    setIsPaymentModalOpen(false); // Close the payment modal
    clearCart(); // Clear the cart after successful order
    setShowOrderApprovedPage(true); // Show the approved page
  };

  const handleDeliveryAddressSubmit = (address: ShippingAddress) => {
    setConfirmedDeliveryAddress(address);
    console.log("Delivery Address Confirmed:", address);
  };

  // Conditional rendering based on showOrderApprovedPage
  if (showOrderApprovedPage && confirmedDeliveryAddress) {
    return (
      <OrderApprovedPage
        deliveryAddress={confirmedDeliveryAddress}
        totalPrice={totalAmountToPay}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 relative overflow-hidden">
      {/* Background blobs/elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Column: Cart Items */}
        <div className="md:col-span-1">
          <CartHeader />
          <div className="mt-6">
            <CartDisplay />
          </div>
        </div>

        {/* Right Column: Order Summary & Delivery Address Input */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <ShippingOptions
            onAddressSubmit={handleDeliveryAddressSubmit}
            initialAddress={confirmedDeliveryAddress}
          />

          {confirmedDeliveryAddress && (
            <div className="mt-4 p-4 bg-gray-10 rounded-lg text-sm text-gray-700 border border-green-200">
              <h3 className="font-semibold mb-4 text-green-800">
                Confirmed Delivery Address:
              </h3>
              <p className="regular-16 text-gray-50 my-2">{confirmedDeliveryAddress.homeAddress}</p>
              <p className="regular-16 text-gray-50 my-2">
                {confirmedDeliveryAddress.lga}, {confirmedDeliveryAddress.state}
              </p>
              <p className="regular-14 text-gray-50 my-2"> <span className="medium-16"> Phone:</span> {confirmedDeliveryAddress.phoneNumber}</p>
            </div>
          )}

          <OrderSummary
            subtotal={subtotal}
            onProceedToPaymentClick={handleOpenPaymentModalFromSummary}
            disablePaymentButton={disableProceedToPayment}
          />
        </div>
      </div>

      {/* Render the PaymentModal (as a modal) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onBack={handleBackFromPaymentModal}
        totalPrice={totalAmountToPay}
        deliveryAddress={confirmedDeliveryAddress}
        onCardPaymentSubmit={handleCardPaymentFinalSubmit}
        onPayOnDelivery={handlePayOnDelivery}
      />
    </div>
  );
};

export default CartPage;
