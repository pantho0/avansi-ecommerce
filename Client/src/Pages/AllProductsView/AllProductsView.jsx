import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import LodaingState from "../../Components/Loading State/LodaingState";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const AllProductsView = () => {
  const [totalProducts, setTotalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const pages = Math.ceil(totalProducts / limit);

  const numberofButtons = [...Array(pages).keys()];
  const axiosPublic = useAxiosPublic();

  const handlePageButton = (btn) => {
    setCurrentPage(btn + 1);
  };

  const { data: products = [], isFetching } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosPublic("/productCount").then((res) =>
      setTotalProducts(res.data.total)
    );
  }, [axiosPublic]);

  if (isFetching) {
    return <LodaingState />;
  }

  // const { data: products = [], isFetching } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/products");
  //     return res.data;
  //   },
  // });

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (isFetching) {
    return <LodaingState />;
  }

  return (
    <>
      <div className="min-h-screen pt-20">
        <section className="text-gray-600 body-font min-h-screen">
          <div className="container py-10  mx-auto">
            {products && products.length > 0 ? (
              <div>
                <div className="grid grid-cols-2 text-center md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => {
                    return (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="group block overflow-hidden"
                      >
                        <div className="relative h-[250px] sm:h-[450px]">
                          <img
                            alt="ecommerce"
                            className="object-cover md:object-cover object-center  md:w-full md:h-full block"
                            src={product.images[0]}
                          />
                        </div>

                        <div className="relative bg-white pt-3">
                          <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {product?.name}
                          </h3>
                          <h3 className="text-sm text-gray-700  ">
                            Category : {product?.category}
                          </h3>

                          <p className="mt-1.5 tracking-wide text-gray-900">
                            <span className="flex justify-center items-center">
                              <TbCurrencyTaka size={18} />
                              {product?.price}
                            </span>
                          </p>
                        </div>
                      </Link>
                      // <div
                      //   key={product.name}
                      //   className="shadow-lg mx-4 rounded-md p-4 md:p-4"
                      // >
                      //   <a className="block relative h-[120px] md:h-28 rounded overflow-hidden">
                      //     <img
                      //       alt="ecommerce"
                      //       className="object-contain object-center w-[120px] h-[120px] md:w-full md:h-full block"
                      //       src={product.images[0]}
                      //     />
                      //   </a>
                      //   <div className="mt-4">
                      //     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      //       {product.parent_category}
                      //     </h3>
                      //     <h2 className="text-gray-900 title-font font-medium text-sm md:text-lg">
                      //       {product.name}
                      //     </h2>
                      //     <p className="mt-1 text-primary font-bold">
                      //       <span className="flex justify-center items-center">
                      //         <TbCurrencyTaka size={18} />
                      //         {product.price}
                      //       </span>
                      //     </p>
                      //   </div>
                      //   <div className="card-actions justify-center md:justify-center">
                      //     <Link to={`/product/${product._id}`}>
                      //       <button className="btn btn-primary btn-sm w-full hover:btn-accent">
                      //         Buy Now
                      //       </button>
                      //     </Link>
                      //   </div>
                      // </div>
                    );
                  })}
                </div>
                <div className="flex justify-center my-4 mt-20 mb-0 ">
                  <div className="join ">
                    {numberofButtons.map((pageBtn) => (
                      <input
                        key={pageBtn}
                        onClick={() => handlePageButton(pageBtn)}
                        className="join-item btn btn-accent"
                        type="radio"
                        name="options"
                        aria-label={pageBtn + 1}
                        checked={pageBtn + 1 === currentPage}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-screen flex justify-center items-center">
                <p>No Products Found</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default AllProductsView;
