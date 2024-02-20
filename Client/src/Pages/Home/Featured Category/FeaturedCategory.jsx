import { Swiper, SwiperSlide } from "swiper/react";
import { GiClothes } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";
import { SiFacebookgaming } from "react-icons/si";
import { MdOutlinePets } from "react-icons/md";
import { SiHomeassistant } from "react-icons/si";
import Container from "../../../Components/Ui/Container/Container";
import { FaMobile } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const FeaturedCategory = () => {
  return (
    <Container>
      <div className="my-50">
        <div className="flex flex-col items-center md:flex-row justify-between">
          <h2 className="text-base md:text-3xl font-bold">Featured Category</h2>
         <Link to='/'>
         <button className="btn btn-xs md:btn-outline border-primary md:btn-md px-8 hover:btn-primary">
            View All
          </button>
         </Link>
        </div>
        <div className="mt-8">
          <Swiper
            slidesPerView={1}
            spaceBetween={8}  
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
                <div className="flex flex-col items-center p-5 border border-shadow-500">
                    <FaMobile className="text-primary" size={60}/>
                    <h6 className="text-sm font-bold">Electronic</h6>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex flex-col items-center p-5 border border-shadow-500">
                    <GiClothes className="text-primary" size={60}/>
                    <h6 className="text-sm font-bold">Fashion</h6>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex flex-col items-center p-5 border border-shadow-500">
                    <TbPerfume className="text-primary" size={60}/>
                    <h6 className="text-sm font-bold">Body Care</h6>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex flex-col items-center p-5 border border-shadow-500">
                    <SiFacebookgaming className="text-primary" size={60}/>
                    <h6 className="text-sm font-bold">Gaming</h6>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex flex-col items-center p-5 border border-shadow-500">
                    <MdOutlinePets className="text-primary" size={60}/>
                    <h6 className="text-sm font-bold">Pet Supplies</h6>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex flex-col items-center p-5 border border-shadow-500">
                    <SiHomeassistant className="text-primary" size={60}/>
                    <h6 className="text-sm font-bold">Home & Kitchen</h6>
                </div>
            </SwiperSlide>
            
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedCategory;
