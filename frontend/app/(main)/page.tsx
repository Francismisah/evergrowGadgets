import Footer from "@/components/Footer";
import GetApp from "@/components/GetApp";
import Hero from "@/components/Hero";
import SidebarCategories from "./products/goods/SidebarCategories";

export default function Home() {
  return (
    <>
      <Hero />
      <SidebarCategories />
      <GetApp />
      <Footer />
    </>
  );
}
