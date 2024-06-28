import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {isLoading !== true ? (
        <>
          <div className="row">
            {categories.map((category) => (
              <div key={category._id} className="w-full lg:w-1/4 p-6">
                <Link to={`/categoriesDetails/${category.name}`}>
                  <div className="inner">
                    <img src={category.image} alt="" />
                    <h3>{category.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center pt-10">
        <PropagateLoader color="green" />
        </div>
      )}
    </>
  );
}
