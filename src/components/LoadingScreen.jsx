// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // simulate content load
    return () => clearTimeout(timer);
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
            <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-green-800 font-semibold animate-pulse">
              Loading...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
