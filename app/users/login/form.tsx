"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Login successful, redirect to profile or home
        router.push("/users/profile");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push("/users/register");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-20 rounded-2xl border-1 border-gray-200">
      <h1 className="mb-5">Login</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <label htmlFor="email">
        Email
        <br />
      </label>
      <input
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full mt-1 mb-3"
        id="email"
        name="email"
        type="email"
        required
      />
      
      <label htmlFor="password">Password</label>
      <br />
      <input
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full mt-1"
        id="password"
        name="password"
        type="password"
        required
      />
      
      <div className="flex flex-row items-center justify-left mt-6">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </button>
        <label className="pl-4 text-sm">
          Don't have account?{" "}
          <a className="text-accent cursor-pointer" onClick={navigateToRegister}>
            Register
          </a>
        </label>
      </div>
    </form>
  );
}
