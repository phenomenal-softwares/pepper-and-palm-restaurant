import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-yellow-50 shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Name */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-green-800">Pepper</span>
              <span className="text-red-700">&amp;</span>
              <span className="text-amber-500">Palm</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-gray-900 hover:text-green-800 font-medium">Home</a>
            <a href="#menu" className="text-gray-900 hover:text-green-800 font-medium">Menu</a>
            <a href="#order" className="text-gray-900 hover:text-green-800 font-medium">Order</a>
            <a href="#about" className="text-gray-900 hover:text-green-800 font-medium">About</a>
            <a href="#contact" className="text-gray-900 hover:text-green-800 font-medium">Contact</a>
            
            {/* Icons */}
            <FiSearch className="text-gray-900 hover:text-amber-500 cursor-pointer text-xl" />
            <FiShoppingCart className="text-gray-900 hover:text-red-700 cursor-pointer text-xl" />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <FiX className="text-2xl text-gray-900" />
              ) : (
                <FiMenu className="text-2xl text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-yellow-50 shadow-md">
          <div className="flex flex-col space-y-4 py-4 px-6">
            <a href="#home" className="text-gray-900 hover:text-green-800 font-medium">Home</a>
            <a href="#menu" className="text-gray-900 hover:text-green-800 font-medium">Menu</a>
            <a href="#order" className="text-gray-900 hover:text-green-800 font-medium">Order</a>
            <a href="#about" className="text-gray-900 hover:text-green-800 font-medium">About</a>
            <a href="#contact" className="text-gray-900 hover:text-green-800 font-medium">Contact</a>
            
            <div className="flex space-x-6 pt-4 border-t border-gray-200">
              <FiSearch className="text-gray-900 hover:text-amber-500 cursor-pointer text-xl" />
              <FiShoppingCart className="text-gray-900 hover:text-red-700 cursor-pointer text-xl" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
