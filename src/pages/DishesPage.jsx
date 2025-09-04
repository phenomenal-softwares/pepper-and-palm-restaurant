import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DishCard from "../components/FoodCard";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

function DishesPage({ foods }) {
  const [index, setIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract category from query string ?category=rice
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Update category on navigation change
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || "all";
    setSelectedCategory(category);
  }, [location.search]);

  // Unique categories from data
  const categories = ["all", ...new Set(foods.map((food) => food.category))];

  // Filtered dishes
  const filteredFoods =
    selectedCategory === "all"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    navigate(`/dishes?category=${cat}`);
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
          hearty soups and refreshing drinks. Pick a category to satisfy your
          craving.
        </p>
      </div>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300
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

      {/* Dishes Grid */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFoods.map((food, i) => (
            <DishCard
              key={food.id}
              food={food}
              onImageClick={() => setIndex(i)} // ✅ now opens the correct slide
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-12">
          No dishes available in this category.
        </p>
      )}

      {/* Lightbox with captions */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        slides={filteredFoods.map((f) => ({
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
