import { useState } from "react";

const AddProducts = () => {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [variant, setVariant] = useState('');
  const [variants, setVariants] = useState([])
  console.log(variant);

  const handleAddVariant = () =>{
    if(variant.trim() !== ''){
      setVariants([...variants, variant])
      setVariant('')
    }
  }

  const clearVariant = () =>{
    setVariants([])
  }

  const handleAddColor = () => {
    if (color.trim() !== "") {
      setColors([...colors, color]);
      setColor("");
    }
  };

  const clearAddColor = () =>{
    setColors([])
  }

  const handleAddProduct = (e)=>{
    e.preventDefault();
  }
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
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product Category</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="text"
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
                  value={variant}
                  onChange={(e)=>setVariant(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-3/4 bg-white"
                />
                <div>
                  <button onClick={clearVariant} className="btn btn-primary btn-md w-full">Clear</button>
                </div>
                <div className="">
                  <button onClick={handleAddVariant} className="btn btn-primary btn-md w-full">Add</button>
                </div>
              </div>
              <div className="px-2">
                {
                  variants.length > 0 && <p>{variants.join(', ')}</p>
                }
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
                  value={color}
                  placeholder="Type here"
                  onChange={(e) => setColor(e.target.value)}
                  className="input input-bordered w-3/4 bg-white"
                />
                <div>
                  <button onClick={clearAddColor} className="btn btn-primary btn-md w-full">Clear</button>
                </div>
                <div className="">
                  <button onClick={handleAddColor} className="btn btn-primary btn-md w-full">Add</button>
                </div>
              </div>
              <div className="px-2">
                {
                  colors.length > 0 && <p>{colors.join(', ')}</p>
                }
              </div>
                
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Parent Category</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product Specification</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product Description</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pictures</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
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
