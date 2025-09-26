"use client";

import Image from "next/image";
import Button from "@/app/components/button";

export default function Profile() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">
          Email
          <br />
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full mt-1 mb-3"
          id="email"
          name="email"
          type="text"
        />
        <label>Password</label>
        <br />
        <input
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full mt-1"
          type="text"
          name="name"
        />
        <div className="flex flex-row items-center justify-center mt-5">
          <button type="submit">Login</button>
          <label className="pl-4 text-sm">
            Don't have account?{" "}
            <a className="text-accent" href="/users/register">
              Register
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}
