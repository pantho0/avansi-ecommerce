import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import LodaingState from "../../Components/Loading State/LodaingState";
import { TbCurrencyTaka } from "react-icons/tb";

const Cateories = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    window.scrollTo(0, 0);
    const categoryFromState = location.state && location.state.category;
    if (categoryFromState) {
      setCategory(categoryFromState);
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    if (!loading && category !== null) {
      axiosPublic(`/products?parent_category=${category}`).then((data) =>
        setProducts(data.data)
      );
    }
  }, [axiosPublic, category, loading]);

  if (loading) {
    return <LodaingState />;
  }
  return (
    <div className="min-h-screen pt-20">
      <section className="text-gray-600 body-font">
        <div className="container py-10  mx-auto">
          {products && products.length > 0 ? (
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
                  //     <p className="mt-1  text-green-800 font-bold">
                  //       <span className="flex justify-center items-center">
                  //         <TbCurrencyTaka size={18} />
                  //         {product.price}
                  //       </span>
                  //     </p>
                  //   </div>
                  //   <div className="card-actions justify-center md:justify-center">
                  //     <Link to={`/product/${product._id}`}>
                  //       <button className="btn btn-primary bg-green-900 border-none btn-sm w-full text-white hover:bg-indigo-500">
                  //         Buy Now
                  //       </button>
                  //     </Link>
                  //   </div>
                  // </div>
                );
              })}
            </div>
          ) : (
            <div className="h-screen flex justify-center items-center">
              <p>No Products Found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cateories;
