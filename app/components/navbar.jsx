import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "./logout-button";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b-1 border-gray-200 bg-white sticky top-0 w-full p-1 z-50">
      <div className="xl:max-w-[80rem] m-5 sm:max-w-5/6 flex flex-row justify-between mx-auto">
        <div>
          <Link href="/">
            <Image
              src="/logo.webp"
              width={230}
              height={0}
              className="cursor-pointer"
              alt="Dengar Svara Logo"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-10">
          <Link href="/" className="cursor-pointer text-center flex flex-row items-center">
            Beranda
          </Link>
          <a className="cursor-pointer text-center flex flex-row items-center">Tentang Kami</a>
          <a className="cursor-pointer text-center flex flex-row items-center">Artikel</a>
          <a className="cursor-pointer text-center flex flex-row items-center">Kontak</a>
        </div>
        <div className="flex flex-row items-center gap-3">
          <span className="material-symbols-outlined cursor-pointer">search</span>
          
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Hello, {session.user?.name}</span>
              <Link 
                href="/users/profile"
                className="material-symbols-outlined cursor-pointer"
                title="Profile"
              >
                person
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/users/login"
                className="material-symbols-outlined cursor-pointer"
                title="Login"
              >
                person
              </Link>
              <Link
                href="/users/login"
                className="text-sm px-3 py-1 bg-accent text-white rounded hover:bg-accent/75 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
