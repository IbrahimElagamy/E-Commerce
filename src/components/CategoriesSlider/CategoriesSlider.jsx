import React, { useEffect, useState } from "react";
import Style from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  const [categories, setCategoies] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategoies(data.data);
      })
      .catch((error) => {
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Slider className="px-4" {...settings}>
        {categories.map((category) => (
          <img
            key={category.image}
            className="w-full category-img h-[200px]"
            src={category.image}
            alt={category.name}
          />
        ))}
      </Slider>
    </>
  );
}
