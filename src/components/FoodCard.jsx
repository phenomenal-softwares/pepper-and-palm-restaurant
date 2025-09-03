import { motion } from "framer-motion";
import { FiShoppingCart, FiMaximize2 } from "react-icons/fi";

function FoodCard({ food, onImageClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden group">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={onImageClick}
        />
        {/* View Icon Overlay */}
        <div
          onClick={onImageClick}
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
        >
          <FiMaximize2 className="text-white text-2xl" />
        </div>
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {food.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-1">{food.description}</p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-amber-600">
            ₦{food.price.toLocaleString()}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-green-700 transition"
          >
            <FiShoppingCart /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default FoodCard;
