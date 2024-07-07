import { useEffect } from "react";
import Articles from "./Articles/Articles";
import Banner from "./Banner/Banner";
import FeaturedCategory from "./Featured Category/FeaturedCategory";
import PopularProducts from "./Popular Products/PopularProducts";
import Subscribe from "./Subscribe/Subscribe";
import { Helmet } from "react-helmet-async";
import WomenProducts from "./WomenProdut/WomenProducts";
import AllProducts from "./All Products/AllProducts";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Helmet title="Avansi Fashion Multi-Vendor Store" />
      <Banner />
      <FeaturedCategory />
      <PopularProducts />
      <WomenProducts />
      <AllProducts />
      <Subscribe />
      <Articles />
    </div>
  );
};

export default Home;
