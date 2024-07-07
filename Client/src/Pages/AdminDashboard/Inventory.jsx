import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import UpdateProductModal from "../../Components/Modals/Product Update Modal/UpdateProductModal";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../Components/Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: products = [], refetch: inventoryReload } = useQuery({
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
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#272253",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosPublic.delete(`/deleteProduct/${id}`);
        if (data.deletedCount > 0) {
          inventoryReload();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleInStock = async (id) => {
    const { data } = await axiosSecure.patch(`/instock/${id}`);
    if (data.modifiedCount > 0) {
      toast.success("Product marked as in Stock");
      inventoryReload();
    }
  };

  const handleStockOut = async (id) => {
    const { data } = await axiosSecure.patch(`/stockout/${id}`);
    if (data.modifiedCount > 0) {
      toast.success("Product marked as stock out");
      inventoryReload();
    }
  };

  return (
    <>
      <div>
        <UpdateProductModal
          isOpen={isOpen}
          closeModal={closeModal}
          productId={productId}
          inventoryReload={inventoryReload}
        />
      </div>
      <div className="">
        <div className="text-center py-6 bg-black text-white">
          <div className="space-y-2">
            <p className="text-2xl font-bold">Inventory</p>
            <p className="text-sm text-white">All Products</p>
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
                  <th>Actions</th>
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
                              <img src={product?.images[0]} />
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
                        <button
                          disabled={!!product?.inStock}
                          onClick={() => handleInStock(product._id)}
                          className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black   text-white "
                        >
                          Make Instock
                        </button>
                      </th>
                      <th>
                        <button
                          disabled={!product?.inStock}
                          onClick={() => handleStockOut(product._id)}
                          className="btn btn-primary  text-white bg-green-900 border-none hover:bg-accent hover:text-black"
                        >
                          Make StockOut
                        </button>
                      </th>
                      <th>
                        <div className="flex gap-3 ">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setProductId(product._id);
                            }}
                            className="btn btn-xs tooltip"
                            data-tip="Update"
                          >
                            <LuFileEdit size={20} color="green" />
                          </button>

                          <div className="tooltip" data-tip="Delete">
                            <MdDelete
                              onClick={() => handleDelete(product._id)}
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
