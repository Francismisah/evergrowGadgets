import Navbar from "@/components/Navbar";

import React from "react";
import { CartProvider } from "../context/CartContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>
        <CartProvider>{children}</CartProvider>
      </main>
    </>
  );
}
