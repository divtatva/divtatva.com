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
            <span
              className={`text-2xl font-bold text-white ${dancingScript.className}`}>
              Divtatva
            </span>
          </div>
          </Link>
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
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
