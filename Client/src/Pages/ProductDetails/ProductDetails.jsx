import { useLoaderData } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Container from "../../Components/Ui/Container/Container";
import "swiper/css";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { image, name, price, description, variant, colors, rating } =
    useLoaderData();

  return (
    <div className="pt-20">
      <Container>
        <div className="flex gap-16 mt-16">
          {/* image */}
          <div className="w-96">
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
          {/* description */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{name}</h2>
            <div className="flex items-center gap-2">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star bg-orange-400"
                  checked
                />
              </div>
              <p>{rating}</p>
            </div>
            <p className="text-2xl font-bold text-primary">${price} </p>
            <p className="text-slate-500">{description}</p>
            <div className="divider"></div>
            <h2>Product Variant :</h2>
            <div className="flex gap-4">
              <div>
                <p>Type</p>
                <select className="select select-primary w-full max-w-xs">
                  <option disabled selected>
                    Select Please
                  </option>
                  <option>{variant}</option>
                </select>
              </div>
              <div>
                <p>color</p>
                <select className="select select-primary w-full max-w-xs">
                  <option disabled selected>
                    Select Please
                  </option>
                  {
                    colors.map(color=><option key={color}>{color}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="flex gap-2">
            <button className="btn btn-primary">Buy Now</button>
            <button className="btn btn-outline">Add To Cart</button>

        </div>
          </div>
        </div>
   
      </Container>
    </div>
  );
};

export default ProductDetails;
