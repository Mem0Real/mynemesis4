"use client";

import Image from "next/image";
import Logo from "@/public/images/nemesisLogo.jpg";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  fallback: ["system-ui", "arial"],
});
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={menuRef}>
      <nav className="w-full md:h-16 h-fit shadow-xl bg-neutral-900 text-white navbar fixed z-10">
        <div className="flex justify-between items-center w-full h-full px-8 py-2 text-md">
          <Link href="/">
            <div className="flex justify-evenly items-center">
              <Image
                src={Logo}
                alt="logo"
                width="55"
                height="auto"
                className="cursor-pointer rounded-full"
                priority
              />
              <h1 className="lg:px-12 sm:px-6 px-6 hidden sm:block text-xl uppercase font-medium">
                Nemesis
              </h1>
            </div>
          </Link>
          <div className="w-full">
            <ul className="hidden md:flex">
              <div className="flex justify-between items-center w-full">
                <div className="md:px-9">
                  <SearchInput />
                </div>
                <div className="flex">
                  <Link href="/collection">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      Collection
                    </li>
                  </Link>
                  <Link href="/services">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      Services
                    </li>
                  </Link>
                  <Link href="/about">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      About
                    </li>
                  </Link>
                  <Link href="/admin">
                    <li className="ml-10 underline underline-offset-8 hover:underline-offset-2">
                      Admin
                    </li>
                  </Link>
                </div>
              </div>
            </ul>
          </div>
          <div className="block md:hidden text-white">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
              <svg
                className={`fill-current h-3 w-3 ${
                  isOpen ? "hidden" : "block"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-3 w-3 ${
                  isOpen ? "block" : "hidden"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto z-20 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-sm sm:hidden block bg-neutral-900 py-5 mt-9">
          <Link href="/collection">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              Collection
            </li>
          </Link>
          <Link href="/services">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              Services
            </li>
          </Link>
          <Link href="/about">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              About
            </li>
          </Link>
          <Link href="/admin">
            <li className="block mt-4 border-b lg:inline-block lg:mt-0 text-white-200 mr-4 ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
              Admin
            </li>
          </Link>
          <div className="py-6">
            <SearchInput />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
