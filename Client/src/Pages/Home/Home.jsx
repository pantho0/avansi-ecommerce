import Footer from "../../Components/Shared/Footer";
import AllProducts from "./All Products/AllProducts";
import Articles from "./Articles/Articles";
import Banner from "./Banner/Banner";
import FeaturedCategory from "./Featured Category/FeaturedCategory";
import PopularProducts from "./Popular Products/PopularProducts";
import Subscribe from "./Subscribe/Subscribe";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedCategory/>
            <PopularProducts/>
            <AllProducts/>
            <Subscribe/>
            <Articles/>
            <Footer/>
        </div>
    );
};

export default Home;