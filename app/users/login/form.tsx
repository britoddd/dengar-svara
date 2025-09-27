"use client";

import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const onSubmit = () => {
    router.push("/users/register");
  };
  return (
    <form className="bg-white p-20 rounded-2xl border-1 border-gray-200">
      <h1 className="mb-5">Login</h1>
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
      <div className="flex flex-row items-center justify-left mt-6">
        <button type="submit">Login</button>
        <label className="pl-4 text-sm">
          Don't have account?{" "}
          <a className="text-accent cursor-pointer" onClick={onSubmit}>
            Register
          </a>
        </label>
      </div>
    </form>
  );
}
