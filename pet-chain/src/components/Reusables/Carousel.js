import React, { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "./styles.css";
import axios from "../../url"







export const Carousel = () => {
  SwiperCore.use([EffectCoverflow, Autoplay]);

  const [daata, setDaata] = useState([]);
  const [imagesss, setImagesss] = useState([]);
  const slides = imagesss;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allPets");
        const petsData = response.data.pets;
        setDaata(petsData);
        const petImages = petsData.map((pet) => pet.imageUrl);
        setImagesss(petImages);
        console.log(imagesss)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="carousel-wrapper">
      <Swiper
        grabCursor
        centeredSlides
        slidesPerView={1} // Adjust the number of slides per view
        spaceBetween={0} // Adjust the space between slides
        effect="coverflow"
        loop
        coverflowEffect={{
          rotate: 300,
          stretch: 0,
          depth: 10,
          modifier: 1,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        
        initialSlide={0} // Set the initial slide index to 0
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img style={{width:"300px", height:"400px", borderRadius:"20px"}} src={slide} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
