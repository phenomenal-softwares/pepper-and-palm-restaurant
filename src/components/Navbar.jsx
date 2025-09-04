// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext"; // ✅ import cart context

const categories = [
  { name: "All Dishes", slug: "all" },
  { name: "Rice", slug: "rice" },
  { name: "Grills", slug: "grills" },
  { name: "Swallow", slug: "swallow" },
  { name: "Pepper Soups", slug: "soups" },
  { name: "Beans Delights", slug: "beans" },
  { name: "Snacks", slug: "snacks" },
  { name: "Drinks & Desserts", slug: "drinks" },
];

function Navbar({ onCartToggle }) {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [menuOpen, setMenuOpen] = useState(false); // desktop dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile submenu
  const location = useLocation();
  const { totalItems } = useCart(); // ✅ cart item count

  const baseLink =
    "px-1 py-1 font-medium text-gray-900 hover:text-green-800 relative " +
    "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-800 " +
    "after:w-0 hover:after:w-full after:transition-all";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="bg-yellow-50 shadow-md fixed w-full z-20 top-0 left-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-green-800">Pepper</span>
              <span className="text-red-700">&amp;</span>
              <span className="text-amber-500">Palm</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center relative">
            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseLink} ${isActive ? "text-green-800 after:w-full" : ""}`
              }
            >
              Home
            </NavLink>

            {/* Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className={`${baseLink} ${
                  location.pathname.startsWith("/dishes")
                    ? "text-green-800 after:w-full"
                    : ""
                } flex items-center gap-1`}
              >
                Menu <FiChevronDown className="mt-0.5" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-56"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/dishes?category=${cat.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-green-800"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            <Link to="/#order" className={baseLink}>
              Order
            </Link>
            <Link to="/#about" className={baseLink}>
              About
            </Link>
            <Link to="/#contact" className={baseLink}>
              Contact
            </Link>

            {/* Icons */}
            <FiSearch className="text-gray-900 hover:text-amber-500 cursor-pointer text-xl" />

            {/* Cart Icon with Badge */}
            <button
              onClick={onCartToggle}
              className="relative text-gray-900 hover:text-red-700 cursor-pointer"
            >
              <FiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen((s) => !s)}>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-yellow-50 shadow-md overflow-hidden"
          >
            <div className="flex flex-col space-y-4 py-4 px-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-green-800" : "text-gray-900"}`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>

              {/* Collapsible Menu group */}
              <button
                className="flex items-center justify-between font-medium text-gray-900"
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={
                    location.pathname.startsWith("/dishes")
                      ? "text-green-800"
                      : ""
                  }
                >
                  Menu
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    mobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="pl-4 flex flex-col space-y-2"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/dishes?category=${cat.slug}`}
                        className="text-sm text-gray-700 hover:text-green-800"
                        onClick={() => {
                          setIsOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/#order"
                className="text-gray-900 hover:text-green-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Order
              </Link>
              <Link
                to="/#about"
                className="text-gray-900 hover:text-green-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/#contact"
                className="text-gray-900 hover:text-green-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex space-x-6 pt-4 border-t border-gray-200">
                <FiSearch className="text-gray-900 hover:text-amber-500 cursor-pointer text-xl" />

                {/* Cart on Mobile */}
                <button
                  onClick={onCartToggle}
                  className="relative text-gray-900 hover:text-red-700"
                >
                  <FiShoppingCart className="text-2xl" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
