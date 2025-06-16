import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "cancer free org",
  description: "Tyme & Tide Resturant ui/ux app for engineers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      >
      <Navbar/>
        <main >
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
