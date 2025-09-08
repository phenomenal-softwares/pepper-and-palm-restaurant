import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiBookOpen } from "react-icons/fi";
import chefImg from "../assets/chef.png";
import heroImg from "../assets/hero-bg.jpg";

function Hero() {
  function scrollToMenu() {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-yellow-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Nigerian Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-5 pt-9 md:text-left max-w-xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-6xl font-extrabold text-yellow-50 drop-shadow-lg"
          >
            Taste the <span className="text-amber-400">Flavors</span> of{" "}
            <span className="text-green-500">Naija!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-6 text-lg md:text-xl text-gray-200"
          >
            Bringing authentic recipes with a modern twist, from our kitchen to
            your table.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Link
              to="/dishes"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              <FiShoppingBag size={20} /> Order Now
            </Link>
            <button
              onClick={scrollToMenu}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-semibold shadow-lg hover:bg-amber-600 transition transform hover:scale-105"
            >
              <FiBookOpen size={20} /> View Menu
            </button>
          </motion.div>
        </motion.div>

        {/* Chef Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={chefImg}
            alt="Chef Illustration"
            className="rounded-2xl shadow-2xl max-h-[500px] object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
