import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosPublic("/banners");
      return data;
    },
  });

  return (
    <div>
      <>
        <div className="pt-16 pb-16">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {banners.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <img src={banner.banners} className="object-cover w-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    </div>
  );
};

export default Banner;
