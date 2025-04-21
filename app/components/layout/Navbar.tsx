import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full ${
        hasScrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 md:py-5">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 md:text-2xl font-heading"
        >
          Omni-Assistant
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-10 md:flex">
          <div className="space-x-8">
            <Link
              to="#features"
              className="text-sm font-medium text-gray-700 transition hover:text-primary-600 font-body"
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium text-gray-700 transition hover:text-primary-600 font-body"
            >
              Pricing
            </Link>
            <Link
              to="#docs"
              className="text-sm font-medium text-gray-700 transition hover:text-primary-600 font-body"
            >
              Docs
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 font-body"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="rounded bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 font-body"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col bg-white px-4 py-6 shadow-lg">
            <Link
              to="#features"
              className="py-2 text-base font-medium text-gray-700 font-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="py-2 text-base font-medium text-gray-700 font-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="#docs"
              className="py-2 text-base font-medium text-gray-700 font-body"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="mt-4 flex flex-col space-y-3">
              <Link
                to="/auth/login"
                className="w-full rounded border border-gray-300 px-4 py-2 text-center text-base font-medium text-gray-700 font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="w-full rounded bg-primary-600 px-4 py-2 text-center text-base font-medium text-white font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 