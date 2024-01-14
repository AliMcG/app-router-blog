"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import titleImage from "@/public/harry-new-header.png";
import SearchInput from "./SearchInput";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  type TitleProps = {
    title: string;
    href: string;
  };

  const titles = [
    { title: "HOME", href: "/" },
    { title: "BLOG", href: "/blog" },
    { title: "CONTACT", href: "/contact" },
    session?.user.role === "ADMIN" && { title: "ADD", href: "/add" },
  ];

  const sortedTitles: TitleProps[] = titles.filter(Boolean) as TitleProps[];

  return (
    <>
      <div className="relative m-auto my-8 flex flex-col items-center">
        <div className="absolute -top-5 right-3">
          <div className="flex flex-row gap-2 lg:flex-col">
            {pathname === "/blog" && <SearchInput />}
            {pathname === "/blog" && <LoginButton />}
          </div>
        </div>
        <header className="mt-6 w-4/5 md:w-auto">
          <Image src={titleImage} alt="Harry Duncton" width="700" height="50" />
        </header>
        <nav className="mt-4 flex w-4/5 justify-evenly font-monts font-semibold text-gray-700 md:w-2/3">
          {sortedTitles.map((title) => {
            return (
              <>
                <Link
                  key={title.href}
                  className={
                    pathname == `${title.href}` ? "text-[#073D93]" : ""
                  }
                  href={title.href}
                >
                  <h1 className="text-lg hover:text-[#067A75] md:text-2xl">
                    {title.title}
                  </h1>
                </Link>
              </>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
