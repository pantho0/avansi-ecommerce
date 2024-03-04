import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import { useEffect, useState } from "react";

const Cateories = ({ value }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)
    console.log(category);
  useEffect(()=>{
    const categoryFromState = location.state && location.state.category
    if(categoryFromState){
        setCategory(categoryFromState)
        setLoading(false)
    }
  }, [location.state])

  if(loading){
    return <div className="h-screen flex justify-center items-center"><p>Loading Data</p></div>
  }
  return (
    <div className="h-screen">
      <div className="pt-20">
        <p> this is categories page</p>
      </div>
    </div>
  );
};

export default Cateories;
