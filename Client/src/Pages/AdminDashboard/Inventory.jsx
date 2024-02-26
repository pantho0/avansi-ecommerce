import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import UpdateProductModal from "../../Components/Modals/Product Update Modal/UpdateProductModal";

const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");

  const axiosPublic = useAxiosPublic();

  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosPublic("/products");
      return data;
    },
  });
  const handleFilter = (e) => {
    setPrice(e.target.value);
    setProductId("");
  };

  // const handleUpdate = () => {
  //   console.log("clicked update");
  // };
  const handleDelete = () => {
    console.log("clicked delete");
  };
  return (
    <>
      <div>
        <UpdateProductModal
          isOpen={isOpen}
          closeModal={closeModal}
          productId={productId}
        />
      </div>
      <div className="">
        <div className="text-center bg-gradient-to-r py-4 from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
          <div className="space-y-2">
            <p className="text-2xl font-bold">Inventory</p>
            <p className="text-sm text-white">All Products</p>
          </div>
          <div className="mt-2 flex justify-evenly gap-3">
            {/* the searchbar  */}
            <div className="form-control w-1/2">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 z-40 md:w-auto"
              />
            </div>
            <div className="flex items-center justify-center z-40 md:p-0 lg:gap-2 p-6">
              <p className="text-sm">Price:</p>
              <select
                onChange={handleFilter}
                className="select select-bordered text-black select-sm w-full max-w-xs"
              >
                <option defaultValue={""} disabled selected>
                  Slect One
                </option>
                <option value={"asc"}>Low to high</option>
                <option value={"desc"}>High to low</option>
              </select>
            </div>
          </div>
        </div>

        {/* All products section */}
        {
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sub Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product?._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={product?.image} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product?.name}</div>
                            <div className="text-sm opacity-50">
                              {product?.parent_category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {product?.category}
                        <br />
                      </td>
                      <td>{product?.price}</td>
                      <th>
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setProductId(product._id);
                            }}
                            className="btn btn-xs"
                          >
                            <LuFileEdit size={20} color="green" />
                          </button>

                          <div className="tooltip" data-tip="delete">
                            <MdDelete
                              onClick={handleDelete}
                              size={20}
                              className="cursor-pointer"
                              color="red"
                            />
                          </div>
                        </div>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </>
  );
};

export default Inventory;
