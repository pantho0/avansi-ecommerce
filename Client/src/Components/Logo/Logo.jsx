import { Link } from "react-router-dom";

import { HiMiniShoppingBag } from "react-icons/hi2";
const Logo = () => {
  return (
    <>
      <Link>
        <div className="flex items-center text-4xl">
          <HiMiniShoppingBag
            size={30}
            className="bg-primary text-white p-1 rounded-full "
          />
          <span className="text-primary">A</span>
          <span className="text-accent">VANSI</span>
          <span className="text-primary">.</span>
        </div>
      </Link>
    </>
  );
};

export default Logo;
