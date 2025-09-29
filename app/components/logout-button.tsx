"use client";

import { signOut } from "@/auth";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const handleSignOut = async () => {
    await signOut({ redirectTo: "/users/login" });
  };

  return (
    <button
      onClick={handleSignOut}
      className={className || "text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"}
    >
      Logout
    </button>
  );
}