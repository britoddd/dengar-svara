"use client";

import { useEffect } from "react";
import { LoginForm } from "./form";

export default function Profile() {
  useEffect(() => {
    // Hide body overflow when component mounts
    document.body.style.overflow = "hidden";

    // Cleanup: restore overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-accent overflow-hidden -mt-16">
      <LoginForm />
    </div>
  );
}
