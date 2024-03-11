import PopularProductsCard from "../../../Components/Home/PopularProductsCard";
import ProductsCard from "../../../Components/Home/ProductsCard";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import Container from "../../../Components/Ui/Container/Container";

const PopularProducts = () => {
  return (
    <Container>
      <div className="mt-16">
          <div className="space-y-4">
            <SectionTitle heading="Popular Products on Avansi" subHeading="Best selling products are here" />
          </div>
        <PopularProductsCard/>
      </div>
    </Container>
  );
};

export default PopularProducts;
