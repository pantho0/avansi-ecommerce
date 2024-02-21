import { IoMdPaperPlane } from "react-icons/io";

const Subscribe = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] my-16 py-10">
      <div className="flex flex-col py-0 md:flex-row md:w-[1200px]  gap-4 mx-auto md:py-8 text-white">
        <div className="flex gap-2 text-center md:w-[600px] md:gap-6 items-center">
          <IoMdPaperPlane size={50} />
          <div>
            <h5 className="text-base md:text-3xl font-bold">
              Signup for Newsletter
            </h5>
            <p className="text-center text-sm">
              We’ll never share your email address
            </p>
          </div>
        </div>
        <div className="flex w-full px-2 md:mx-auto">
          <input
            type="text"
            placeholder="Enter your email here"
            className="input input-bordered w-full rounded-none text-black"
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
