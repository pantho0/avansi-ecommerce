import ProductsCard from "../../../Components/Home/ProductsCard";
import SectionTitle from "../../../Components/Section Title/SectionTitle";


const AllProducts = () => {
    return (
        <div>
            <SectionTitle heading="All Products" subHeading="Explore the store"/>
            <ProductsCard/>
        </div>
    );
};

export default AllProducts;