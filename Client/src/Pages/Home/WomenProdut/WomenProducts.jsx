import React from "react";
import SectionTitle from "../../../Components/Section Title/SectionTitle";
import Container from "../../../Components/Ui/Container/Container";
import WomenProduct from "../../../Components/Home/WomenProduct";

const WomenProducts = () => {
  return (
    <Container>
      <div className="mt-16">
        <div className="space-y-4">
          <SectionTitle
            heading="Women's Collection"
            subHeading="Explore New Collection"
          />
        </div>
        <WomenProduct />
      </div>
    </Container>
  );
};

export default WomenProducts;
