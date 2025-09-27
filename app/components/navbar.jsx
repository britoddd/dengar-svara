"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar(alt) {
  const styles = "px-4 py-2 rounded-md font-medium transition-all";

  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  const handleProfileClick = (e) => {
    router.push(e);
  };

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/75",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <nav className="border-b-1 border-gray-200 bg-white sticky top-0 w-full p-1">
      <div className="xl:max-w-[80rem] m-5 sm:max-w-5/6 flex flex-row justify-between mx-auto">
        <div>
          <Image
            src="/logo.webp"
            width={230}
            height={0}
            onClick={handleClick}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-row gap-10">
          <a className="cursor-pointer text-center flex flex-row items-center">Beranda</a>
          <a className="cursor-pointer text-center flex flex-row items-center">Tentang Kami</a>
          <a className="cursor-pointer text-center flex flex-row items-center">Artikel</a>
          <a className="cursor-pointer text-center flex flex-row items-center">Kontak</a>
        </div>
        <div className="flex flex-column justify-between pt-.6">
          <span className="material-symbols-outlined pr-3">search</span>
          <span className="material-symbols-outlined" onClick={handleProfileClick("/users/login")}>person</span>
        </div>
      </div>
    </nav>
  );
}
