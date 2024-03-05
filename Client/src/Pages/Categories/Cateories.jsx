import { Link, useLocation} from "react-router-dom";

import { useEffect, useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import LodaingState from "../../Components/Loading State/LodaingState";


const Cateories = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const axiosPublic = useAxiosPublic()
 





  useEffect(()=>{
    const categoryFromState = location.state && location.state.category
    if(categoryFromState){
        setCategory(categoryFromState)
        setLoading(false)
    }
  }, [location.state])

  useEffect(()=>{
    if(!loading && category !== null){
       axiosPublic(`/products?parent_category=${category}`)
       .then(data=>setProducts(data.data))
    }
  }, [axiosPublic, category, loading])

  if(loading){
    return <LodaingState/>
  }
  return (
    
    <div className="min-h-screen pt-20">
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
                    <Link to={`/product/${product._id}`}><button className="btn btn-primary btn-sm w-full hover:btn-accent">Buy Now</button></Link>
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

export default Cateories;
