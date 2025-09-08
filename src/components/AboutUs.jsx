import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImg from "../assets/about-us.jpg";

function AboutUs() {
  return (
    <section className="bg-yellow-50 py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutImg}
            alt="About Pepper & Palm"
            className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At{" "}
            <span className="font-semibold text-yellow-600">Pepper & Palm</span>
            , we bring the heart of Nigeria to your table. From sizzling grills
            to soulful soups, our dishes are crafted with love, tradition, and a
            touch of modern flavor.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you crave jollof rice, smoky suya, or rich egusi soup, every
            meal is a celebration of culture, family, and flavor. Step into our
            kitchen and experience Naija cuisine the way it’s meant to be.
          </p>
          <Link
            to="/about"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutUs;
