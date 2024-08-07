import PopularProductsCard from "../../../Components/Home/PopularProductsCard";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import Container from "../../../Components/Ui/Container/Container";

const PopularProducts = () => {
  return (
    <Container>
      <div className="mt-16">
        <div className="space-y-4">
          <SectionTitle
            heading="Men's Collection"
            subHeading="Explore New Collection"
          />
        </div>
        <PopularProductsCard />
      </div>
    </Container>
  );
};

export default PopularProducts;
