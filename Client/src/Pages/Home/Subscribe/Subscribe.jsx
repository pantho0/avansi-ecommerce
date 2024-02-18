import { IoMdPaperPlane } from "react-icons/io";

const Subscribe = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] my-16 py-10">
      <div className="w-[1200px] flex gap-4 mx-auto py-8 text-white">

          <div className="flex w-[600px] gap-6 items-center">
            <IoMdPaperPlane size={50} />
            <div>
              <h5 className="text-3xl font-bold">Signup for Newsletter</h5>
              <p className="text-center">We’ll never share your email address</p>
            </div>
          </div>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Enter your email here"
              className="input input-bordered w-full rounded-none"
            />
            <button className="btn btn-accent border-none rounded-none -ml-2">
              Subscribe
            </button>
          </div>

      </div>
    </div>
  );
};

export default Subscribe;
