import React from "react";
import SidebarCategories from "./goods/SidebarCategories";
import Footer from "@/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

export default function ProductsPage() {
  return (
    <main>
      <SidebarCategories />
      <Footer />
    </main>
  );
}
