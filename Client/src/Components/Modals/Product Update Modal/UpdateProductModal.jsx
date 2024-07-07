import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCategories from "../../Hooks/useCategories";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadImage } from "../../api/api";

export default function UpdateProductModal({
  isOpen,
  closeModal,
  productId,
  inventoryReload,
}) {
  const [loadProduct, setLoadProduct] = useState([]);
  const [categories] = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [variant, setVariant] = useState("");
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const axiosPublic = useAxiosPublic();

  const imgAPI = import.meta.env.VITE_IMGBB_API;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgAPI}`;

  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    const category = categories.find((cat) => cat.name === selectedCategory);
    setSubCategory(category ? category.subcategories : []);
  };

  const handleAddVariant = (e) => {
    e.preventDefault();
    if (variant.trim() !== "") {
      setVariants([...variants, variant]);
      setVariant("");
    }
  };

  const clearVariant = (e) => {
    e.preventDefault();
    setVariants([]);
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    if (color.trim() !== "") {
      setColors([...colors, color]);
      setColor("");
    }
  };

  const clearAddColor = (e) => {
    e.preventDefault();
    setColors([]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const parent_category = form.parentCategory.value;
    const category = form.subCategory.value;
    const variant = variants;
    const color = colors;
    const price = parseFloat(form.price.value);
    const description = form.description.value;

    const productInfo = {
      name,
      parent_category,
      price,
      category,
      variant,
      images,
      color,
      description,
    };

    const { data: uploadResult } = await axiosPublic.post(
      `/updateProduct/${productId}`,
      productInfo
    );
    if (uploadResult.modifiedCount > 0) {
      toast.success("Product Updated");
      inventoryReload();
      setColors([]);
      setVariants([]);
      setImages([]);
      form.reset();
    }
  };

  const handleSelectImg = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  //image upload api call
  const uploadProductImage = async (image) => {
    try {
      const url = await uploadImage(image);
      if (url) {
        toast.success("Product Image Uploaded");
      }
      setImages([...images, url]);
      setSelectedImage("");
    } catch (err) {
      toast.error(
        "Image upload failed or you are trying to upload in the same field"
      );
    }
  };

  const handleImagesUpload = (e) => {
    e.preventDefault();
    const image = selectedImage;
    uploadProductImage(image);
  };

  useEffect(() => {
    if (isOpen && productId) {
      setLoadProduct("");
      setVariant("");
      setColor("");
      axiosPublic(`/singleproducts/${productId}`)
        .then((res) => {
          setLoadProduct(res.data);
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
                    <form onSubmit={handleAddProduct}>
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
                            <span className="label-text">Parent Category</span>
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
                                className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black btn-md w-full"
                              >
                                Clear
                              </button>
                            </div>
                            <div className="">
                              <button
                                onClick={handleAddVariant}
                                className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black btn-md w-full"
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
                                  className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black btn-md w-full"
                                >
                                  Clear
                                </button>
                              </div>
                              <div className="">
                                <button
                                  onClick={handleAddColor}
                                  className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black btn-md w-full"
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

                      <div className="flex flex-row gap-2 items-center">
                        <label className="form-control w-[90%]">
                          <div className="label">
                            <span className="label-text">Pictures</span>
                          </div>
                          <input
                            name="picture"
                            onChange={handleSelectImg}
                            type="file"
                            className="file-input file-input-bordered file-input-md w-full"
                            multiple
                          />
                        </label>
                        <div>
                          <div className="label">
                            <span className="label-text">max:200kb</span>
                          </div>
                          <button
                            onClick={handleImagesUpload}
                            className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black"
                          >
                            Add Image
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <label className="form-control w-[90%]">
                          <div className="label">
                            <span className="label-text">Pictures</span>
                          </div>
                          <input
                            name="picture"
                            onChange={handleSelectImg}
                            type="file"
                            className="file-input file-input-bordered file-input-md w-full"
                            multiple
                          />
                        </label>
                        <div>
                          <div className="label">
                            <span className="label-text">max:200kb</span>
                          </div>
                          <button
                            onClick={handleImagesUpload}
                            className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black"
                          >
                            Add Image
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <label className="form-control w-[90%]">
                          <div className="label">
                            <span className="label-text">Pictures</span>
                          </div>
                          <input
                            name="picture"
                            onChange={handleSelectImg}
                            type="file"
                            className="file-input file-input-bordered file-input-md w-full"
                            multiple
                          />
                        </label>
                        <div>
                          <div className="label">
                            <span className="label-text">max:200kb</span>
                          </div>
                          <button
                            onClick={handleImagesUpload}
                            className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black"
                          >
                            Add Image
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <label className="form-control w-[90%]">
                          <div className="label">
                            <span className="label-text">Pictures</span>
                          </div>
                          <input
                            name="picture"
                            onChange={handleSelectImg}
                            type="file"
                            className="file-input file-input-bordered file-input-md w-full"
                            multiple
                          />
                        </label>
                        <div>
                          <div className="label">
                            <span className="label-text">max:200kb</span>
                          </div>
                          <button
                            onClick={handleImagesUpload}
                            className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black"
                          >
                            Add Image
                          </button>
                        </div>
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
                        <button className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black hover:btn-accent cursor-pointer">
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
