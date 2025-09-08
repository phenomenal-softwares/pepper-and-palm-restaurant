import "yet-another-react-lightbox/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//data
import foods from "./data/foods";

//components
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import Hero from "./components/Hero";
import FeaturedDishes from "./components/FeaturedDishes";
import AboutUs from "./components/AboutUs";
import MenuCategories from "./components/MenuCategories";
import SpecialOffer from "./components/SpecialOffer";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Newsletter from "./components/Newsletter";

//pages
import DishesPage from "./pages/DishesPage";
import OrderPage from "./pages/OrderPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

//context
import { ToastProvider } from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes foods={foods} />
      <AboutUs />
      <div id="menu">
        <MenuCategories />
      </div>
      <SpecialOffer />
      <Testimonials />
      <CTA />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTopOnRouteChange />
          <LoadingScreen />
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
            <Route
              path="/order"
              element={
                <Layout>
                  <OrderPage />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <AboutPage />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <ContactPage />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
