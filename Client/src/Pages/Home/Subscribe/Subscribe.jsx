import { IoMdPaperPlane } from "react-icons/io";

const Subscribe = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] my-16 py-10">
      <div className="flex flex-col py-0 items-center  md:flex-row lg:w-[1200px]  gap-4 mx-auto md:py-8 text-white">
        <div className="flex flex-col items-center md:gap-2 w-[350px] md:items-center  lg:w-[600px] gap-4">
          <IoMdPaperPlane size={40} />
          <div>
            <h5 className="text-base text-center md:text-xl lg:text-3xl font-bold">
              Signup for Newsletter
            </h5>
            <p className="md:text-left lg:text-center text-sm">
              We’ll never share your email address
            </p>
          </div>
        </div>
        <div className="flex  px-2 md:mx-auto lg:w-full">
          <input
            type="text"
            placeholder="Enter your email here"
            className="input input-bordered md:w-full rounded-none text-black"
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
