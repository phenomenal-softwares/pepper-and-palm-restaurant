import "yet-another-react-lightbox/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import Hero from "./components/Hero";
import FeaturedDishes from "./components/FeaturedDishes";
import AboutUs from "./components/AboutUs";
import MenuCategories from "./components/MenuCategories";
import SpecialOffer from "./components/SpecialOffer";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Newsletter from "./components/Newsletter";

import foods from "./data/foods";
import DishesPage from "./pages/DishesPage";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes foods={foods} />
      <AboutUs />
      <MenuCategories />
      <SpecialOffer />
      <Testimonials />
      <CTA />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/dishes"
          element={
            <Layout>
              <DishesPage foods={foods} />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
