import { link } from "fs";
import { href } from "react-router-dom";

// NAVIGATION
export interface NavLink {
  key: string;
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "repairs", href: "/repairs", label: "Repair" }, // This will navigate to /about
  { key: "products", href: "/products", label: "Shop" }, // This will navigate to /contact
];

// CAMP SECTION
export const PEOPLE_URL = ["/p1.jpg", "/p2.jpg", "/p3.jpg", "/p4.jpg"];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Evergrow Gadgets",
      "Press Releases",
      "Environment",
      "Privacy Policy",
      "Contact Us",
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Admin Officer", value: "124-756-7823" },
    { label: "Email Officer", value: "doc@akinthil.com" },
  ],
};

export const SOCIALS = {
  title: "Social",
  links: [
    "/facebook.png",
    "/instagram.png",
    "/twitter.png",
    "/tiktok.png",
    "/linkedin.png",
  ],
};
