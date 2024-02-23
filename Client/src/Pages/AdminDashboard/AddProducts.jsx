const AddProducts = () => {
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
        <form>
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
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Variant</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Colors</span>
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
