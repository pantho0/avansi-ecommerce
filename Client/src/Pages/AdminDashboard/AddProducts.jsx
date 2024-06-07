import { useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useCategories from "../../Components/Hooks/useCategories";
import { uploadImage } from "../../Components/api/api";

const AddProducts = () => {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [variant, setVariant] = useState("");
  const [variants, setVariants] = useState([]);
  const [categories] = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [images, setImages] = useState([]);
  const axiosPublic = useAxiosPublic();

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

  const handleSelectImg = async (e) => {
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

  // console.log(images);

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
    const rating = form.rating.value;
    const reviews = [
      {
        user_name: "Bob",
        image: "https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg",
        date: "2024-02-08",
        rating: 4,
        review_message:
          "Solid performance and premium build. A bit pricey though.",
      },
      {
        user_name: "Alice",
        image: "https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg",
        date: "2024-01-15",
        rating: 5,
        review_message:
          "Absolutely fantastic product! It exceeded all my expectations.",
      },
      {
        user_name: "Emily",
        image: "https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg",
        date: "2024-02-20",
        rating: 3,
        review_message:
          "Decent product, but I expected more features for the price.",
      },
      {
        user_name: "John",
        image: "https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg",
        date: "2024-02-12",
        rating: 4,
        review_message:
          "Great design and functionality. Could be more user-friendly.",
      },
      {
        user_name: "Sarah",
        image: "https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg",
        date: "2024-01-28",
        rating: 4,
        review_message:
          "Sturdy construction and excellent performance. Worth the investment.",
      },
      {
        user_name: "David",
        image: "https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg",
        date: "2024-02-05",
        rating: 2,
        review_message:
          "Disappointing quality for the price. Wouldn't recommend.",
      },
    ];
    const productInfo = {
      name,
      parent_category,
      price,
      category,
      variant,
      images,
      color,
      description,
      rating,
      reviews,
    };
    console.log(productInfo);

    const { data: uploadResult } = await axiosPublic.post(
      "/add_product",
      productInfo
    );
    if (uploadResult.insertedId) {
      toast.success("Product Uploded");
      setColors([]);
      setVariants([]);
      setImages([]);
      form.reset();
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
                name="name"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
                required
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
                required
              >
                <option disabled selected>
                  Pick one
                </option>
                {categories.map((cat) => (
                  <option className="uppercase" key={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Sub Category</span>
              </div>
              <select
                name="subCategory"
                className="select select-bordered uppercase bg-white"
                required
              >
                <option disabled selected>
                  Pick one
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
                name="price"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
                required
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
          <div className="flex flex-col md:flex-col gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <input
                type="text"
                name="rating"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
              />
            </label>
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
              <button onClick={handleImagesUpload} className="btn btn-primary">
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
              <button onClick={handleImagesUpload} className="btn btn-primary">
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
              <button onClick={handleImagesUpload} className="btn btn-primary">
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
              <button onClick={handleImagesUpload} className="btn btn-primary">
                Add Image
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product Description</span>
              </div>
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder="Bio"
                required
              ></textarea>
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
