import ProductsCard from "../../../Components/Home/ProductsCard";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import Container from "../../../Components/Ui/Container/Container";


const AllProducts = () => {
    return (
        <div>
            <Container>
            <SectionTitle heading="All Products" subHeading="Explore the store"/>
            <ProductsCard/>
            </Container>
        </div>
    );
};

export default AllProducts;