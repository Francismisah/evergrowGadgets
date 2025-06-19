import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Only the main content (children) will be rendered here,
    // effectively excluding the Navbar and Footer for auth pages.
    <main>{children}</main>
  );
}
