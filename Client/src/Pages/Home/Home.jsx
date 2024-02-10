import AllProducts from "./All Products/AllProducts";
import Banner from "./Banner/Banner";
import FeaturedCategory from "./Featured Category/FeaturedCategory";
import PopularProducts from "./Popular Products/PopularProducts";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedCategory/>
            <PopularProducts/>
            <AllProducts/>
        </div>
    );
};

export default Home;