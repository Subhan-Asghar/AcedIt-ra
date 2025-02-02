import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-pink-500 text-2xl font-bold">ACEDIT</h3>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-pink-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-pink-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
