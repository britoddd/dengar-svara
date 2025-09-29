"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/users/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-white text-3xl">person</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-md border">
              {session.user?.name}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-md border">
              {session.user?.email}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-md border text-sm text-gray-600">
              {session.user?.id}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push("/users/profile/edit")}
            className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/75 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}