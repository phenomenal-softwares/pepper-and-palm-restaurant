import { useState } from "react";
import FoodCard from "./FoodCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function FeaturedDishes({ foods = [] }) {
  const [index, setIndex] = useState(-1);

  // ✅ Only top 6 dishes
  const featuredFoods = foods.slice(0, 6);

  // For mobile arrows
  const scrollContainer = (dir) => {
    const container = document.getElementById("featured-scroll");
    if (container) {
      const scrollAmount = dir === "left" ? -260 : 260;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!featuredFoods.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No dishes available.
      </div>
    );
  }

  return (
    <div className="py-16 bg-yellow-50 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Featured Dishes
        </h2>

        {/* Horizontal scroll for mobile, 3-col grid for lg */}
        <div className="relative">
          <div
            id="featured-scroll"
            className="flex lg:grid gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible scroll-smooth snap-x snap-mandatory pb-4 lg:grid-cols-3"
          >
            {featuredFoods.map((food, i) => (
              <div
                key={i}
                className="w-64 sm:w-72 lg:w-auto flex-shrink-0 snap-center"
              >
                <FoodCard food={food} onImageClick={() => setIndex(i)} />
              </div>
            ))}
          </div>

          {/* Overlay Arrows (only on mobile) */}
          <button
            onClick={() => scrollContainer("left")}
            className="absolute top-1/2 -translate-y-1/2 left-2 bg-green-600 text-white p-2 rounded-full shadow-md sm:hidden"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollContainer("right")}
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-green-600 text-white p-2 rounded-full shadow-md sm:hidden"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* 👉 View All button */}
        <div className="mt-10 text-center">
          <Link
            to="/dishes"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            View All Dishes
          </Link>
        </div>

        {/* Lightbox with captions */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Captions]}
          slides={featuredFoods.map((f) => ({
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
    </div>
  );
}

export default FeaturedDishes;
