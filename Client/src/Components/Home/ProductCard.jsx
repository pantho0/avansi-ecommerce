import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LodaingState from "../Loading State/LodaingState";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  // const [totalProducts, setTotalProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const limit = 12;
  // const pages = Math.ceil(totalProducts / limit);

  // const numberofButtons = [...Array(pages).keys()];

  // const handlePageButton = (btn) => {
  //   setCurrentPage(btn + 1);
  // };
  const axiosPublic = useAxiosPublic();
  // const { data: products = [], isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/getPartialProducts");
  //     return res.data;
  //   },
  // });

  // useEffect(() => {
  //   axiosPublic("/productCount").then((res) =>
  //     setTotalProducts(res.data.total)
  //   );
  // }, [axiosPublic]);

  // if (isLoading) {
  //   return <LodaingState />;
  // }

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
        <div className="container py-10  mx-auto">
          <div className="grid grid-cols-2 text-center md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...products].slice(0, 20).map((product) => {
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
                //   key={product?.name}
                //   className="shadow-lg mx-4 rounded-md p-4 md:p-4"
                // >
                //   <a className="block relative h-[120px] md:h-28 rounded overflow-hidden">
                //     <img
                //       alt="ecommerce"
                //       className="object-contain object-center w-[120px] h-[120px]  md:object-contain md:object-center md:w-full md:h-full block"
                //       src={product?.images[0]}
                //     />
                //   </a>
                //   <div className="mt-4">
                //     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                //       {product.parent_category}
                //     </h3>
                //     <h2 className="text-gray-900 title-font text-sm md:text-lg font-medium">
                //       {product?.name}
                //     </h2>
                //     <p className="mt-1 text-green-800 font-bold">
                //       <span className="flex justify-center items-center">
                //         <TbCurrencyTaka size={18} />
                //         {product.price}
                //       </span>
                //     </p>
                //   </div>
                //   <div className="card-actions justify-center md:justify-center">
                //     <Link to={`/product/${product?._id}`}>
                //       <button className="btn btn-primary bg-green-900 text-white border-none btn-sm w-full hover:bg-indigo-500">
                //         Buy Now
                //       </button>
                //     </Link>
                //   </div>
                // </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/allproducts">
              <button className="btn btn-primary bg-green-900 border-none text-white hover:bg-indigo-500">
                Show All
              </button>
            </Link>
          </div>
          {/* <div className="flex justify-center my-4">
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
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
