"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Registration successful, redirect to login
        router.push("/users/login");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push("/users/login");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-20 rounded-2xl border-1 border-gray-200">
      <h1 className="mb-5">Sign Up</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <label htmlFor="name">
        Name
        <br />
      </label>
      <input
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full mt-1 mb-3"
        id="name"
        name="name"
        type="text"
        required
      />

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
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
        <label className="pl-4 text-sm">
          Already registered?{" "}
          <a className="text-accent cursor-pointer" onClick={navigateToLogin}>
            Login
          </a>
        </label>
      </div>
    </form>
  );
}
