import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import LodaingState from "../../Components/Loading State/LodaingState";

const SearchResult = () => {
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const searchText = location.state;
  console.log(searchText);

  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", searchText],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products");
      return data;
    },
  });

  const searchResult = products.filter((item) =>
    item.name.toLocaleLowerCase().includes(searchText?.toLocaleLowerCase())
  );

  if (isPending) {
    return <LodaingState />;
  }

  return (
    <div className="pt-20">
      <div className="flex justify-center font-bold text-sm">
        <p>Search Result : {searchResult.length} </p>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container py-10  mx-auto">
          {searchResult && searchResult.length > 0 ? (
            <div className="grid grid-cols-1 text-center md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResult.map((result) => {
                return (
                  <div
                    key={result.name}
                    className="shadow-lg mx-4 rounded-md p-4 md:p-4"
                  >
                    <a className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-contain object-center w-full h-full block"
                        src={result?.images[0]}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {result.parent_category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {result.name}
                      </h2>
                      <p className="mt-1 text-primary font-bold">
                        ${result.price}
                      </p>
                    </div>
                    <div className="card-actions justify-center md:justify-center">
                      <Link to={`/product/${result._id}`}>
                        <button className="btn btn-primary btn-sm w-full hover:btn-accent">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-screen flex justify-center items-center">
              <p className="text-black"> No Product Found </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResult;
