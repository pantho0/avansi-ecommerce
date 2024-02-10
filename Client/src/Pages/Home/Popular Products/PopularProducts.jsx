import ProductsCard from "../../../Components/Home/ProductsCard";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import Container from "../../../Components/Ui/Container/Container";

const PopularProducts = () => {
  return (
    <Container>
      <div className="mt-16">
        <div className="space-y-4">
          {/* <h2 className="text-center text-3xl font-bold">
            Popular Products on Avansi
          </h2>
          <p className="font-medium text-center text-neutral-500">
            Best selling products are here
          </p> */}
          <SectionTitle heading="Popular Products on Avansi" subHeading="Best selling products are here" />
        </div>
        <ProductsCard/>
      </div>
    </Container>
  );
};

export default PopularProducts;
