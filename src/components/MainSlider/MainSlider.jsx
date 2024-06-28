import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import mainSlider1 from "../../assets/finalProject assets/images/slider-image-3.jpeg";
import mainSlider2 from "../../assets/finalProject assets/images/slider-2.jpeg";
import mainSlider3 from "../../assets/finalProject assets/images/grocery-banner-2.jpeg";
import slider1 from "../../assets/finalProject assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/finalProject assets/images/slider-image-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    
  };
  return (
    <>
      <div className="row mt-5">
        <div className="w-3/4">
          <Slider {...settings}>
            <div>
              <img className="w-full h-[400px]" src={mainSlider1} alt="mainSlider1" />
            </div>
            <div>
              <img className="w-full h-[400px]" src={mainSlider2} alt="mainSlider2" />
            </div>
            <div>
              <img className="w-full h-[400px]" src={mainSlider3} alt="mainSlider3" />
            </div>
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slider1} className="w-full h-[200px]" alt="slider1" />
          <img src={slider2} className="w-full h-[200px]" alt="slider2" />
        </div>
      </div>
    </>
  );
}
