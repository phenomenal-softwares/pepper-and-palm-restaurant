import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

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
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const baseLink =
    "px-1 py-1 font-medium text-gray-900 hover:text-green-800 relative " +
    "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-800 " +
    "after:w-0 hover:after:w-full after:transition-all";

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      navigate(`/dishes?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Close search dropdown on outside click or Esc key
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only apply outside click logic for desktop search
      if (window.innerWidth >= 768) {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setSearchOpen(false);
        }
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

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

          {/* Mobile Icons */}
          <div className="flex items-center space-x-5 md:hidden">
            <button onClick={() => setSearchOpen((s) => !s)}>
              <FiSearch className="text-gray-900 hover:text-amber-500 cursor-pointer text-xl" />
            </button>

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

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center relative">
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
            <Link
              to="/order"
              className={`${baseLink} ${
                location.pathname.startsWith("/order")
                  ? "text-green-800 after:w-full"
                  : ""
              } flex items-center gap-1`}
            >
              Order
            </Link>
            <Link
              to="/about"
              className={`${baseLink} ${
                location.pathname.startsWith("/about")
                  ? "text-green-800 after:w-full"
                  : ""
              } flex items-center gap-1`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${baseLink} ${
                location.pathname.startsWith("/contact")
                  ? "text-green-800 after:w-full"
                  : ""
              } flex items-center gap-1`}
            >
              Contact
            </Link>

            {/* Search Icon */}
            <div className="relative" ref={searchRef}>
              <button onClick={() => setSearchOpen((s) => !s)}>
                <FiSearch className="text-gray-900 hover:text-amber-500 cursor-pointer text-xl" />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    onClick={(e) => e.stopPropagation()} // 👈 prevent auto-close
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-amber-500 shadow-lg rounded-lg flex items-center px-2 py-1 space-x-2 w-64 z-50"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search dishes..."
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition"
                    >
                      Go
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
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

      {/* Mobile Dropdown Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.form
            onSubmit={handleSearch}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-amber-500 shadow-md px-4 py-3 z-50"
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes..."
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition"
              >
                Go
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

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
                to="/order"
                className={
                  location.pathname.startsWith("/order")
                    ? "text-green-800 font-medium"
                    : "text-gray-900 hover:text-green-800 font-medium"
                }
                onClick={() => setIsOpen(false)}
              >
                Order
              </Link>
              <Link
                to="/about"
                className={
                  location.pathname.startsWith("/about")
                    ? "text-green-800 font-medium"
                    : "text-gray-900 hover:text-green-800 font-medium"
                }
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={
                  location.pathname.startsWith("/contact")
                    ? "text-green-800 font-medium"
                    : "text-gray-900 hover:text-green-800 font-medium"
                }
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
