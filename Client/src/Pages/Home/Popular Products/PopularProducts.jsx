import ProductsCard from "../../../Components/Home/ProductsCard";
import Container from "../../../Components/Ui/Container/Container";

const PopularProducts = () => {
  return (
    <Container>
      <div className="mt-16">
        <div className="space-y-4">
          <h2 className="text-center text-3xl font-bold">
            Popular Products on Avansi
          </h2>
          <p className="font-medium text-center text-neutral-500">
            Best selling products are here
          </p>
        </div>
        <ProductsCard/>
      </div>
    </Container>
  );
};

export default PopularProducts;
