import { useEffect, useState } from "react";


const useCategories = () => {
    const [categories, setCategory] = useState([]);

    useEffect(()=>{
        fetch('/categories.json')
        .then(res=>res.json())
        .then(data=>setCategory(data))
      },[])


    return [categories]
};

export default useCategories;