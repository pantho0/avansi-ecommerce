import { useEffect } from "react";
import AllProducts from "./All Products/AllProducts";
import Articles from "./Articles/Articles";
import Banner from "./Banner/Banner";
import FeaturedCategory from "./Featured Category/FeaturedCategory";
import PopularProducts from "./Popular Products/PopularProducts";
import Subscribe from "./Subscribe/Subscribe";


const Home = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div>
            <Banner/>
            <FeaturedCategory/>
            <PopularProducts/>
            <AllProducts/>
            <Subscribe/>
            <Articles/>
        </div>
    );
};

export default Home;