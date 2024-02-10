import { useEffect, useState } from "react";

const ProductsCard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container py-10  mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {products.map((product) => {
              return (
                <div
                  key={product.name}
                 className="shadow-lg p-4"
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block"
                      src={product.image}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product.parent_category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-primary font-bold">
                      ${product.price}
                    </p>
                  </div>
                  <div className="card-actions w-1/2 mx-auto">
                    <button className="btn btn-primary btn-sm w-full hover:btn-accent">Buy Now</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsCard;
