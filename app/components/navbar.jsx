"use client";

import Image from "next/image";
import handleLogoClick from "@/app/Redirects"

export default function Navbar() {
  const styles = "px-4 py-2 rounded-md font-medium transition-all";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/75",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <nav className="border-b-1 border-gray-300 bg-white fixed top-0 w-full">
      <div className="xl:max-w-1/2 m-5 sm:max-w-5/6 flex flex-row justify-between mx-auto ">
        <div>
          <Image
            src="/logo.webp"
            width={230}
            height={0}
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-row gap-10">
          <a className="text-center flex flex-row items-center">Beranda</a>
          <a className="text-center flex flex-row items-center">Tentang Kami</a>
          <a className="text-center flex flex-row items-center">Artikel</a>
          <a className="text-center flex flex-row items-center">Kontak</a>
        </div>
        <div className="">
          <span className="material-symbols-outlined">person</span>
        </div>
      </div>
    </nav>
  );
}
