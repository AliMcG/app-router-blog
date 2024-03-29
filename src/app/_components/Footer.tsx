"use client"

import Link from "next/link";
import LinkedIn from "@/public/linkedin-custom.svg";
import Twitter from "@/public/x-social-icon.svg";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="relative mt-12 flex w-screen flex-col items-center md:flex-row md:justify-center">
      <article className="mb-4 flex flex-row justify-center space-x-4">
        <Link
          href="https://uk.linkedin.com/in/harry-duncton-93591731"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn className="h-10 w-10" />
        </Link>
        <Link
          href="https://twitter.com/lethalsturgeon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-10 w-10" />
        </Link>
      </article>
      <footer className="font-monts text-base text-gray-700 md:absolute md:inset-y-4 md:left-10">
        {/* displays a dynamic copyright date */}
        <p>© {year} Harry Duncton</p>
      </footer>
    </div>
  );
}

export default Footer;
