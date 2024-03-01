import { useEffect, useState } from "react";


const useDivisions = () => {
    const [divisions, setDivisions] = useState([]);
    useEffect(()=>{
        fetch('/location.json')
        .then(res=>res.json())
        .then(data=>setDivisions(data))
    },[])
    return [divisions];
};

export default useDivisions;