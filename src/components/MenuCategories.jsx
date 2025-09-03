import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import swallowImg from "../assets/swallow.jpg";
import grillsImg from "../assets/grills.jpg";
import riceImg from "../assets/rice.jpg";
import beansImg from "../assets/beans.jpg";
import snacksImg from "../assets/snacks.jpg";
import drinksImg from "../assets/drinks.jpg";

const categories = [
  {
    id: 1,
    name: "Swallows & Soups",
    desc: "Traditional Nigerian meals packed with flavor.",
    image: swallowImg,
  },
  {
    id: 2,
    name: "Grills",
    desc: "Smoky and spicy grilled meats & fish.",
    image: grillsImg,
  },
  {
    id: 3,
    name: "Rice",
    desc: "Jollof, fried rice, and other tasty classics.",
    image: riceImg,
  },
  {
    id: 4,
    name: "Beans Delights",
    desc: "Moin-moin, akara, ekuru, and other beans favorites.",
    image: beansImg,
  },
  {
    id: 5,
    name: "Snacks",
    desc: "Egg roll, puff-puff, meat pie, and other enjoyables.",
    image: snacksImg,
  },
  {
    id: 6,
    name: "Drinks & Desserts",
    desc: "Refreshing local drinks and sweet treats.",
    image: drinksImg,
  },
];

export default function MenuCategories() {
  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Explore Our Menu
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              className="relative rounded-2xl overflow-hidden shadow-lg group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to={`/dishes?category=${cat.name}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-500 flex flex-col items-center justify-center text-center text-white p-4">
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-sm">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
