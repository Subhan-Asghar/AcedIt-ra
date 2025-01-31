import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-pink-500 text-2xl font-bold">ACEDIT</h3>
        <ul className="flex space-x-6">
          <li className="text-gray-700 hover:text-pink-500 cursor-pointer">Home</li>
          <li className="text-gray-700 hover:text-pink-500 cursor-pointer">About</li>
          <li className="text-gray-700 hover:text-pink-500 cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
