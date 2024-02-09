import Banner from "./Banner/Banner";
import FeaturedCategory from "./Featured Category/FeaturedCategory";
import PopularProducts from "./Popular Products/PopularProducts";


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedCategory/>
            <PopularProducts/>
        </div>
    );
};

export default Home;