"use client";
import Link from "next/link";
import Logo from "../ui/Logo";
import { dancingScript } from "@/lib/fonts/Fonts";

const Navbar = () => (
  <header className="bg-blue-950 shadow-md">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo />
            <div className="flex-shrink-0">
              <span className={`text-2xl font-bold text-white ${dancingScript.className}`}>Divtatva</span>
            </div>
          </Link>
        </div>
        {/* Desktop menu */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a
              href="calendar"
              className="text-orange-700 bg-blue-100 hover:text-white hover:bg-orange-600 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              Calendar
            </a>
          </div>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) menu.classList.toggle('hidden');
            }}
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="calendar"
            className="block text-orange-700 bg-blue-100 hover:text-white hover:bg-orange-600 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
