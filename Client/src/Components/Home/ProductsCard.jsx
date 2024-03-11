import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LodaingState from "../Loading State/LodaingState";

const ProductsCard = () => {
  const [totalProducts, setTotalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const pages = Math.ceil(totalProducts / limit);

  const numberofButtons = [...Array(pages).keys()];

  const handlePageButton = (btn) => {
    setCurrentPage(btn + 1);
  };
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    axiosPublic("/productCount").then((res) =>
      setTotalProducts(res.data.total)
    );
  }, [axiosPublic]);




  if(isLoading){
    return <LodaingState/>
  }
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
        <div className="container py-10  mx-auto">
          <div className="grid grid-cols-1 text-center md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              return (
                <div
                  key={product.name}
                  className="shadow-lg mx-4 rounded-md p-4 md:p-4"
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block"
                      src={product.images[0]}
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
                  <div className="card-actions justify-center md:justify-center">
                    <Link to={`/product/${product._id}`}>
                      <button className="btn btn-primary btn-sm w-full hover:btn-accent">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center my-4">
            <div className="join">
              {numberofButtons.map((pageBtn) => (
                <input
                  key={pageBtn}
                  onClick={() => handlePageButton(pageBtn)}
                  className="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label={pageBtn + 1}
                  checked={pageBtn + 1 === currentPage}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsCard;
