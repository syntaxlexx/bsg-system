"use client";

import { siteInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { FC, useState } from "react";

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

interface Props {}

const Header: FC<Props> = ({}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <section className="w-full px-6 pb-12 antialiased bg-white">
      <div className="mx-auto max-w-7xl">
        <nav className="relative z-50 h-24 select-none">
          <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
            <div className="flex items-center justify-start w-1/4 h-full pr-4">
              <a
                href="#_"
                className="flex items-center py-4 space-x-2 font-extrabold text-gray-900 md:py-0"
              >
                <span className="flex items-center justify-center w-8 h-8 text-white bg-gray-900 rounded-full">
                  <svg
                    className="w-auto h-5 -translate-y-px"
                    viewBox="0 0 69 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m31.2 12.2-3.9 12.3-13.4.5-13.4.5 10.7 7.7L21.8 41l-3.9 12.1c-2.2 6.7-3.8 12.4-3.6 12.5.2.2 5-3 10.6-7.1 5.7-4.1 10.9-7.2 11.5-6.8.6.4 5.3 3.8 10.5 7.5 5.2 3.8 9.6 6.6 9.8 6.4.2-.2-1.4-5.8-3.6-12.5l-3.9-12.2 8.5-6.2c14.7-10.6 14.8-9.6-.4-9.7H44.2L40 12.5C37.7 5.6 35.7 0 35.5 0c-.3 0-2.2 5.5-4.3 12.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>{siteInfo.name}</span>
              </a>
            </div>
            <div
              className={cn(
                "top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 lg:text-base md:bg-transparent md:p-0 md:relative md:flex",
                {
                  "flex fixed": showMenu,
                  hidden: !showMenu,
                }
              )}
            >
              <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                <a
                  href="#_"
                  className="items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
                >
                  {siteInfo.name}
                </a>
                <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                  {navItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2  lg:mx-3 md:text-center",
                        {
                          "text-black": item.href === "/",
                          "text-gray-700 hover:text-black": item.href !== "/",
                        }
                      )}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                  <a
                    href="#"
                    className="w-full px-6 py-2 mr-0 text-gray-700 md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                  >
                    Sign In
                  </a>
                  <a
                    href="#_"
                    className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-gray-900 md:w-auto md:rounded-full hover:bg-gray-800 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-gray-800"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="absolute right-0 flex flex-col items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100"
            >
              <MenuIcon className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
