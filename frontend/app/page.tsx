import GetApp from "@/components/GetApp";
import Hero from "@/components/Hero";
import SidebarCategories from "@/components/SidebarCategories";
import Testimony from "@/components/Testimony";

export default function Home() {
  return (
    <>
      <Hero />
      <SidebarCategories />
      <GetApp />
      <Testimony />
    </>
  );
}
