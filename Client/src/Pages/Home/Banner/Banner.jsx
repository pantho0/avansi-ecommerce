import banner_one from '../../../assets/images/banner/banner_one.jpg'
import banner_two from '../../../assets/images/banner/banner_two.jpg'
import banner_three from '../../../assets/images/banner/banner_three.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Container from '../../../Components/Ui/Container/Container';

const Banner = () => {
  return (
   <div>
     <Container>
      <div className='pt-16 pb-16'>
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
        <SwiperSlide ><img src={banner_one} className='w-full' /></SwiperSlide>
        <SwiperSlide ><img src={banner_two} className='w-full' /></SwiperSlide>
        <SwiperSlide ><img src={banner_three} className='w-full' /></SwiperSlide>
      </Swiper>
    </div>
    </Container>
   </div>
  );
};

export default Banner;
