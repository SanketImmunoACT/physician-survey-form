"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to the Physician Survey Portal
      </h1>

      <Link href="/form">
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-3 rounded-lg text-base sm:text-lg md:text-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer">
          Go to Survey Form
        </button>
      </Link>
    </div>
  );
}
