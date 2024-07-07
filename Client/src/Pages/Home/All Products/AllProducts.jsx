import ProductCard from "../../../Components/Home/ProductCard";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import Container from "../../../Components/Ui/Container/Container";

const AllProducts = () => {
  return (
    <div>
      <Container>
        <SectionTitle heading="All Products" subHeading="Explore the store" />
        <ProductCard />
      </Container>
    </div>
  );
};

export default AllProducts;
