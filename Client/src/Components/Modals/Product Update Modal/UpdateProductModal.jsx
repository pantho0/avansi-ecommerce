import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCategories from "../../Hooks/useCategories";


export default function UpdateProductModal({ isOpen, closeModal, productId }) {
  const [loadProduct, setLoadProduct] = useState([]);
  const [categories] = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subCategory, setSubCategory] = useState([])
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [variant, setVariant] = useState("");
  const [variants, setVariants] = useState([]);
  const axiosPublic = useAxiosPublic();

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




  useEffect(() => {
    if (isOpen && productId) {
      setLoadProduct('')
      axiosPublic(`/singleproducts/${productId}`)
        .then((res) =>{
          setLoadProduct(res.data)
        })
        .catch((err) => console.log("fetching error", err));
    }
  }, [axiosPublic, isOpen, productId]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center"></div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {loadProduct.name}
                  </Dialog.Title>
                    <div className="px-10 mt-10">
                      <form >
                        <div className="flex flex-col gap-2">
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text">Product Name</span>
                            </div>
                            <input
                              type="text"
                              name="name"
                              defaultValue={loadProduct?.name}
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
                            <select
                              name="parentCategory"
                              onChange={handleCategory}
                              className="select select-bordered uppercase bg-white"
                            >
                              <option selected disabled>
                              {loadProduct.parent_category}
                              </option>
                              {categories.map((cat) => (
                                <option className="uppercase" key={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="form-control w-full ">
                            <div className="label">
                              <span className="label-text">Sub Category</span>
                            </div>
                            <select
                              name="subCategory"
                              className="select select-bordered uppercase bg-white"
                            >
                              <option disabled selected>
                                {loadProduct.category}
                              </option>
                              {subCategory.map((subcat) => (
                                <option className="uppercase" key={subcat}>
                                  {subcat}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text">Price</span>
                            </div>
                            <input
                              type="number"
                              defaultValue={loadProduct.price}
                              name="price"
                              placeholder="Type here"
                              className="input input-bordered w-full bg-white"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col md:flex-col gap-2">
                          <label className="form-control  w-full">
                            <div className="label">
                              <span className="label-text">Variant</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-2 ">
                              <input
                                type="text"
                                name="variant"
                                value={variant}
                                onChange={(e) => setVariant(e.target.value)}
                                placeholder="Type here"
                                className="input input-bordered w-full md:w-3/4 bg-white"
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
                                <div
                                  key={variant}
                                  className="bg-green-100 mt-1 p-2"
                                >
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
                              <div className="flex flex-col md:flex-row items-center gap-2 ">
                                <input
                                  type="text"
                                  name="color"
                                  value={color}
                                  placeholder="Type here"
                                  onChange={(e) => setColor(e.target.value)}
                                  className="input input-bordered w-full md:w-3/4 bg-white"
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
                                  <p className="bg-green-100 mt-1 p-2">
                                    {colors.join(", ")}
                                  </p>
                                )}

                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-col gap-2">
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text">Rating</span>
                            </div>
                            <input
                              type="text"
                              name="rating"
                              defaultValue={loadProduct.rating}
                              placeholder="Type here"
                              className="input input-bordered w-full bg-white"
                            />
                          </label>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text">Pictures</span>
                            </div>
                            <input
                              type="file"
                              name="picture"
                              className="file-input file-input-bordered file-input-md w-full"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text">
                                Product Description
                              </span>
                            </div>
                            <textarea
                              name="description"
                              value={loadProduct.description}
                              className="textarea textarea-bordered"
                              placeholder="Bio"
                            ></textarea>
                          </label>
                        </div>
                        <div className="flex justify-center mt-6 mb-10">
                          <button className="btn btn-primary hover:btn-accent cursor-pointer">
                            <input type="submit" value="Update Product" />
                          </button>
                        </div>
                      </form>
                    </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
