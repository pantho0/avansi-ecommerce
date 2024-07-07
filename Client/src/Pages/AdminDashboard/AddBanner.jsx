import { useQuery } from "@tanstack/react-query";
import { uploadImage } from "../../Components/api/api";
import useAxiosSecure from "./../../Components/Hooks/useAxiosSecure";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";

const AddBanner = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosPublic("/banners");
      return data;
    },
  });
  const handleImagesUpload = async (e) => {
    e.preventDefault();
    const image = e.target.picture.files[0];
    const url = await uploadImage(image);
    const images = {
      banners: url,
    };
    if (url) {
      const { data } = await axiosSecure.post("/uploadBanner", images);
      console.log(data);
      if (data.acknowledged) {
        refetch();
        // window.location.reload();
        e.target.reset();
      }
    }
  };

  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/deletebanner/${id}`);
    if (data.deletedCount > 0) {
      toast.success("Banner Image Deleted");
      refetch();
    }
  };
  return (
    <div>
      <div className="text-center py-6 bg-black text-white">
        <div className="space-y-2">
          <p className="text-2xl font-bold">Add Banner</p>
          <p className="text-sm text-white">Upload Your Banner Images Here</p>
        </div>
      </div>
      <div className="border-2 border-dashed mt-2 border-red-300 py-20 mx-2">
        <p className="text-2xl font-bold text-center">Uploaded Banners</p>
        <div className="flex flex-wrap gap-2">
          {banners.map((banner, idx) => (
            <div key={idx} className="relative">
              <img
                className="w-[300px]"
                src={banner.banners}
                alt="images will go here"
              />
              <div
                onClick={() => handleDelete(banner._id)}
                className="absolute top-0 right-0 cursor-pointer text-white bg-black rounded-md p-[5px]"
              >
                <MdDeleteSweep size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex justify-center items-center">
        <div>
          <form onSubmit={handleImagesUpload}>
            <label className="form-control w-[90%]">
              <div className="label">
                <span className="label-text">Pictures</span>
              </div>
              <input
                name="picture"
                type="file"
                className="file-input file-input-bordered file-input-md w-full"
                multiple
              />
            </label>
            <div className="flex justify-center mt-2 mb-4">
              <button className="btn btn-primary bg-green-900 border-none hover:bg-accent hover:text-black">
                Add Image
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
