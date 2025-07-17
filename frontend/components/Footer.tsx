import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/constants";

const Footer = () => {
  return (
    <footer className="flexCenter bg-red-950 py-11 bg-center bg-cover">
      <div className="padding-container max-container mb-16 flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logos.png" alt="logo" width={160} height={160} />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {/* Learn More Section */}
            {FOOTER_LINKS.map((columns) => (
              // ✨ Key moved to the direct child of the map
              <FooterColumn title={columns.title} key={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {columns.links.map((link) => (
                    // ✨ Correct: Key is on the list item `li`
                    <li key={link}>
                      <Link href="/">{link}</Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            {/* Contact Section */}
            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label} // This was correct
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap text-yellow-600">
                      {link.label}:
                    </p>
                    <p className="medium-14 whitespace-nowrap text-white">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            {/* Socials Section */}
            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex flex-row gap-4 text-white">
                  {SOCIALS.links.map((link) => (
                    // ✨ Correct: Key is on the list item `li`
                    <li key={link}>
                      <Link href="/">
                        <Image
                          src={link}
                          alt="social icon"
                          width={25}
                          height={25}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border-yellow-50 mt-10 border-[1px]" />
        <p className="regular-14 w-full text-center text-white">
          2025 expose cancer | all rights reserved
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5 text-yellow-600">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
