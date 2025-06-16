import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Evergrow Gadgets",
  description: "Evergrow Gadgets website",
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
