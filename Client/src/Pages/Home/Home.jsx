import { useEffect } from "react";
import AllProducts from "./All Products/AllProducts";
import Articles from "./Articles/Articles";
import Banner from "./Banner/Banner";
import FeaturedCategory from "./Featured Category/FeaturedCategory";
import PopularProducts from "./Popular Products/PopularProducts";
import Subscribe from "./Subscribe/Subscribe";
import { Helmet } from "react-helmet-async";


const Home = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div>
            <Helmet title="Avansi Multi-Vendor Store"/>
            <Banner/>
            <FeaturedCategory/>
            <PopularProducts/>
            <AllProducts/>
            {/* <Subscribe/> */}
            <Articles/>
        </div>
    );
};

export default Home;