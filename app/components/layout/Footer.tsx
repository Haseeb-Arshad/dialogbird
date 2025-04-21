import { Link } from "@remix-run/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <div className="mb-4 sm:mb-0">
          <Link to="/" className="text-lg font-bold text-gray-900 font-heading">
            Omni-Assistant
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-500 font-body">
          © {currentYear} Omni-Assistant. All rights reserved.
        </div>
        
        <div className="mt-4 flex space-x-6 sm:mt-0">
          <Link 
            to="/privacy" 
            className="text-sm text-gray-500 hover:text-gray-700 font-body"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-sm text-gray-500 hover:text-gray-700 font-body"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
} 