// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi"; // ✅ this one exists

function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    let images = Array.from(document.images);
    let loadedCount = 0;

    const markLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setTimeout(() => setLoading(false), 400);
      }
    };

    if (images.length === 0) {
      setLoading(false);
    } else {
      images.forEach((img) => {
        if (img.complete) {
          markLoaded();
        } else {
          img.addEventListener("load", markLoaded);
          img.addEventListener("error", markLoaded);
        }
      });
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", markLoaded);
        img.removeEventListener("error", markLoaded);
      });
    };
  }, [location]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-yellow-50 flex items-center justify-center z-[9999]"
        >
          <div className="flex flex-col items-center">
            {/* Fork & Knife icon animation */}
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-green-700 text-5xl"
            >
              <GiKnifeFork />
            </motion.div>

            <p className="mt-4 text-green-800 font-semibold animate-pulse">
              Serving up goodness... Please wait!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
