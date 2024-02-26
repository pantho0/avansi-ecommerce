import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useCategories from "../../Components/Hooks/useCategories";

const AddProducts = () => {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [variant, setVariant] = useState("");
  const [variants, setVariants] = useState([]);
  const [categories] = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subCategory, setSubCategory] = useState([])
  const axiosPublic = useAxiosPublic()

  useEffect(()=>{
    fetch('/categories.json')
    .then(res=>res.json())
    .then(data=>setCategory(data))
  },[])

  const imgAPI = import.meta.env.VITE_IMGBB_API;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgAPI}`

  const handleCategory = (e)=>{
    
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    const category = categories.find(cat=> cat.name === selectedCategory)
    setSubCategory(category ? category.subcategories : []);

  }

  const handleAddVariant = (e) => {
    e.preventDefault()
    if (variant.trim() !== "") {
      setVariants([...variants, variant]);
      setVariant("");
    }
  };

  const clearVariant = () => {
    setVariants([]);
  };

  const handleAddColor = (e) => {
    e.preventDefault()
    if (color.trim() !== "") {
      setColors([...colors, color]);
      setColor("");
    }
  };

  const clearAddColor = () => {
    setColors([]);
  };

  const handleAddProduct = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const parent_category = form.parentCategory.value;
    const category = form.subCategory.value;
    const variant = variants;
    const color = colors;
    const price = form.price.value;
    const description = form.description.value; 
    const rating = form.rating.value;
    const picture = form.picture.files[0];
    const formData = new FormData();
    formData.append('image', picture)
    const {data} = await axios.post(imgHostingApi, formData)
    const image = data.data.display_url;
    const reviews = []
    const productInfo = {
      name, parent_category, price, category, variant, color, description, rating, image, reviews
    }
    console.log(productInfo);

    const {data:uploadResult} = await axiosPublic.post('/add_product', productInfo)
    if(uploadResult.insertedId){
      toast.success('Product Uploded')
    }

  };


  return (
    <div className="bg-white h-[100%]">
      <div className="text-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="lg:p-6">
          <p className="text-2xl font-bold">Add Products</p>
          <p className="text-sm text-white">
            Products will be added to inventory
          </p>
        </div>
      </div>
      <div className="px-10 mt-10">
        <form onSubmit={handleAddProduct}>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product Name</span>
              </div>
              <input
                type="text"
                name = 'name'
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">
                  Parent Category
                </span>
              </div>
              <select name="parentCategory" onChange={handleCategory} className="select select-bordered uppercase bg-white">
                <option disabled selected>
                  Pick one
                </option>
                {
                  categories.map(cat=><option className="uppercase" key={cat.name}>{cat.name}</option>)
                }
              </select>
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
          <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">
                  Sub Category
                </span>
              </div>
              <select name="subCategory"  className="select select-bordered uppercase bg-white">
                <option disabled selected>
                  Pick one
                </option>
                {
                  subCategory.map(subcat=><option className="uppercase" key={subcat}>{subcat}</option>)
                }
              </select>
            </label>
            
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                name="price"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control  w-full">
              <div className="label">
                <span className="label-text">Variant</span>
              </div>
              <div className="flex items-center gap-2 ">
                <input
                  type="text"
                  name="variant"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-3/4 bg-white"
                />
                <div>
                  <button
                    onClick={clearVariant}
                    className="btn btn-primary btn-md w-full"
                  >
                    Clear
                  </button>
                </div>
                <div className="">
                  <button
                    onClick={handleAddVariant}
                    className="btn btn-primary btn-md w-full"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="">
                {variants.map((variant) => (
                  <div key={variant} className="bg-green-100 mt-1 p-2">
                    <p>{variant}</p>
                  </div>
                ))}
              </div>
            </label>

            <div className="w-full flex gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Colors</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <input
                    type="text"
                    name="color"
                    value={color}
                    placeholder="Type here"
                    onChange={(e) => setColor(e.target.value)}
                    className="input input-bordered w-3/4 bg-white"
                  />
                  <div>
                    <button
                      onClick={clearAddColor}
                      className="btn btn-primary btn-md w-full"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={handleAddColor}
                      className="btn btn-primary btn-md w-full"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="">
                  {colors.length > 0 && (
                    <p className="bg-green-100 mt-1 p-2">{colors.join(", ")}</p>
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
          <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <input
                type="text"
                name = 'rating'
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pictures</span>
              </div>
              <input type="file" name="picture" className="file-input file-input-bordered file-input-md w-full" />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product Description</span>
              </div>
              <textarea name="description" className="textarea textarea-bordered" placeholder="Bio"></textarea>
            </label>

          </div>
          <div className="flex justify-center mt-6 mb-10">
            <button className="btn btn-primary hover:btn-accent cursor-pointer">
              <input type="submit" value="Add Product" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
