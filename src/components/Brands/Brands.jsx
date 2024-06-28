import React, { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

export default function Brands() {
  const [isLoading, setIsLoading] = useState(true);
  const [brans, setBrans] = useState([]);
  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrans(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      {isLoading !== true ? (
        <>
          <div className="row mt-2">
            {brans.map((brand) => (
              <div key={brand._id} className="w-full lg:w-1/6 group">
                <div className="inner p-3 ">
                  <Link to={`/relatedBrand/${brand.name}`}>
                  <div className="inner p-6 border rounded-xl hover:border-green-500 hover:border-2 duration-100">
                    <img className="w-full group-hover:scale-125 duration-150" src={brand.image} alt="" />
                  </div>
                </Link>
                </div>
                
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-center pt-10">
            <PropagateLoader color="green"/>
          </div>
        </>
      )}
    </>
  );
}
