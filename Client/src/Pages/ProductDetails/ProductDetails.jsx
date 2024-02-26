import { useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Container from "../../Components/Ui/Container/Container";
import "swiper/css";
import "swiper/css/pagination";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useCart from "../../Components/Hooks/useCart";

const ProductDetails = () => {
  const {user} = useAuth();
  const [ ,refetch, ,reloadTotalPrice] = useCart();
  const axiosPublic = useAxiosPublic()
  const [selectedColor, setColor] = useState('');
  const [selectedType, setType] = useState('')
  const {
    _id,
    image,
    name,
    price,
    description,
    variant,
    color,
    rating,
    category,
    reviews,
  } = useLoaderData();

  const handleSelectColor = (e) =>{
    e.preventDefault();
    setColor(e.target.value);

  }
  const handleSelectType = (e) =>{
    e.preventDefault();
    setType(e.target.value);

  }

  const handleAddToCart = async(_id,name, price, selectedType, selectedColor) =>{
    if(!user){
      return toast.error("Please Login First")
    }
    if(selectedColor === ""){
      return toast.error('please select color')
    }
    if(selectedType === ""){
      return toast.error('please select type')
    }
    const item = {
      product_id : _id,
      image : image,
      name : name,
      price : parseFloat(price),
      quantity : 1,
      priceWithQuantity: parseFloat(price),
      type : selectedType, 
      color : selectedColor,
      email : user.email
    }

    const {data} = await axiosPublic.post('/saveToCart', item)
    if(data.insertedId){
      refetch()
      reloadTotalPrice()
      toast.success("Product Added To Cart")
    }

  }


  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <>
    <Helmet title="Avansi || Product-Details"/>
    <div className="pt-20">
      <Container>
        <div className="flex flex-col gap-0 mt-2 md:flex-row md:gap-16 md:mt-16">
          {/* image */}
          <div className="w-full md:w-96">
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
          <div className="space-y-1 text-center md:space-y-2 md:text-left">
            <h2 className="text-xl md:text-3xl font-bold">{name}</h2>
            <div className="md:flex items-center gap-2">
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
            <div className="flex justify-center gap-2 md:justify-start md:gap-4">
              <div>
                <p>Type</p>
                <select onChange={handleSelectType} className="select select-primary w-full max-w-xs">
                  <option disabled selected>
                    Select Please
                  </option>
                  <option>{variant}</option>
                </select>
              </div>
              <div>
                <p>color</p>
                <select onChange={handleSelectColor} className="select select-primary w-full max-w-xs">
                  <option >
                  Select Please
                  </option>
                  {color.map((col) => (
                    <option key={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col px-16 md:flex-row gap-2 md:px-0">
              <button className="btn btn-primary">Buy Now</button>
              <button onClick={()=>handleAddToCart(_id,name, price, selectedType, selectedColor)} className="btn btn-outline">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="pl-2 md:pl-0">
          <div className="divider"></div>
          <h4 className="text-xl md:text-2xl font-bold">About This Product </h4>
          <div className="mt-6">
            <p className="font-bold">Name : {name}</p>
            <p>Category : {category}</p>
            <p>Description : {description}</p>
            <p>Variant: {variant}</p>
            <p>
              colors:
              {color.map((col, index) => (
                <span key={col}>
                  {color}
                  {index !== col.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="pl-2 md:pl-0">
          <div className="divider"></div>
          <h4 className="text-xl md:text-2xl font-bold">Reviews</h4>
          <div className="mt-4">
            {reviews.map((review) => (
              <Swiper
                key={review}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="text-center space-y-2 pb-9">
                    <div className="flex justify-center">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />
                    </div>
                    <div>
                      <h6>{review.review_message}</h6>
                      <p>{review.date}</p>
                      <div className="avatar placeholder items-center gap-2">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          img
                        </div>
                        <p>{review.user_name}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center space-y-2 pb-9">
                    <div className="flex justify-center">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />
                    </div>
                    <div>
                      <h6>{review.review_message}</h6>
                      <p>{review.date}</p>
                      <div className="avatar placeholder items-center gap-2">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          img
                        </div>
                        <p>{review.user_name}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="text-center space-y-2 pb-9">
                    <div className="flex justify-center">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />
                    </div>
                    <div>
                      <h6>{review.review_message}</h6>
                      <p>{review.date}</p>
                      <div className="avatar placeholder items-center gap-2">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          img
                        </div>
                        <p>{review.user_name}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                
              </Swiper>
            ))}
            <div className="divider"></div>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
};

export default ProductDetails;
