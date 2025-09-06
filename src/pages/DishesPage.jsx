import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import DishCard from "../components/FoodCard";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

function DishesPage({ foods }) {
  const [index, setIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Watch URL params for search or category
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const search = queryParams.get("search");

    if (category) {
      setSelectedCategory(category.toLowerCase());
      setSearchQuery(""); // clear search when switching category
    } else if (search) {
      setSearchQuery(search.toLowerCase());
      setSelectedCategory("all"); // reset category
    } else {
      setSelectedCategory("all");
      setSearchQuery("");
    }
  }, [location.search]);

  // ✅ Categories from data
  const categories = ["all", ...new Set(foods.map((food) => food.category))];

  // ✅ Filtering logic
  let displayedFoods = foods;
  if (searchQuery) {
    displayedFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery)
    );
  } else if (selectedCategory !== "all") {
    displayedFoods = foods.filter(
      (food) => food.category.toLowerCase() === selectedCategory
    );
  }

  // ✅ Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/dishes?search=${encodeURIComponent(searchQuery.trim().toLowerCase())}`
      );
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat.toLowerCase());
    navigate(`/dishes?category=${cat.toLowerCase()}`);
  };

  return (
    <div className="bg-yellow-50 mb-10 pt-24 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-3">
          Our Delicious Dishes
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Explore a variety of meals prepared with love — from spicy grills to
          hearty soups and refreshing drinks.
        </p>
      </div>

      {/* ✅ Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 max-w-xl mx-auto gap-2"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          placeholder="Search dishes..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Search
        </button>
      </form>

      {/* ✅ Filter Section */}
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-semibold text-gray-700 mb-3 text-center"
        >
          Filter by categories
        </motion.h2>

        <div
          className="flex md:flex-wrap gap-3 justify-start md:justify-center overflow-x-scroll pb-2"
        >
          <div className="flex gap-3 mb-8 overflow-x-auto filter-scrollbar animate-fadeIn">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-300
        ${
          selectedCategory === cat
            ? "bg-green-700 text-white shadow-md"
            : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"
        }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dishes Grid */}
      {displayedFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedFoods.map((food, i) => (
            <DishCard
              key={food.id}
              food={food}
              onImageClick={() => setIndex(i)} // ✅ open lightbox
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-12">No dishes found.</p>
      )}

      {/* ✅ Lightbox */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        slides={displayedFoods.map((f) => ({
          src: f.image,
          title: f.name,
          description: f.description,
        }))}
        on={{
          click: ({ event }) => {
            if (event.target.classList.contains("yarl__container")) {
              setIndex(-1);
            }
          },
        }}
      />
    </div>
  );
}

export default DishesPage;
