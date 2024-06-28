import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { PropagateLoader } from "react-spinners";
import { cartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";


export default function ProductDetails() {
  const [isLoading, setIsLoading] = useState(true);
  let { addToCart , setNumOfCartItems } = useContext(cartContext);
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
    setNumOfCartItems(response?.data.numOfCartItems);
      toast.success("Product added successfully to Your cart", {
        duration: 4000,
        position: "bottom-left",
      });
    } else {
      toast.error("Error Adding Product to Your cart", {
        duration: 4000,
        position: "bottom-left",
      });
    }
  }
  let { id, category } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [reletedProducts, setReletedProducts] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setIsLoading(false);
      })
      .catch(({ error }) => {
        setIsLoading(false);
      });
  }
  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setIsLoading(false);
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name == category
        );
        setReletedProducts(related);
      })
      .catch(({ error }) => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);
  return (
    <>
      {isLoading ? (
        <>
          <div className="pt-10 flex justify-center">
            <PropagateLoader color="green" />
          </div>
        </>
      ) : (
        <>
          <div className="row justify-center items-center">
            <div className="w-full lg:w-1/4">
              <div className="inner">
                <Slider {...settings}>
                  {productDetails?.images.map((src) => (
                    <img key={src} className="w-full" src={src} alt="" />
                  ))}
                </Slider>
              </div>
            </div>
            <div className="w-full lg:w-3/4 px-10">
              <div className="inner">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  {productDetails?.title}
                </h3>
                <p className="text-gray-600 font-light my-4">
                  {productDetails?.description}
                </p>
                <div className="flex justify-between items-center">
                  <span>{productDetails?.price} EGP</span>
                  <span>
                    {productDetails?.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
                <div className="overflow-hidden p-3">
                  <button onClick={()=>addProductToCart(productDetails.id)} className="btn bg-green-800 text-white w-full hover:bg-green-700 m-3">
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        <hr className="block lg:hidden" />
          <div className="row">
            {reletedProducts.map((product) => (
              <div key={product._id} className="w-full lg:w-1/6 p-6 group">
                <div className="inner">
                <Link onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' })}}
                    to={`/productDetails/${product._id}/${product.category.name}`}
                  >
                    <img
                      className="w-full"
                      src={product?.imageCover}
                      alt={product?.title}
                    />
                    <span className="text-green-600 font-light">
                      {product?.category.name}
                    </span>
                    <h3 className="text-lg font-normal text-gray-800">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span>{product.price} EGP</span>
                      <span>
                        {product.ratingsAverage}{" "}
                        <i className="fas fa-star text-yellow-500"></i>
                      </span>
                    </div>
                    <div className="overflow-hidden p-3">
                      <button onClick={()=>addProductToCart(product.id)} className="btn bg-green-800 text-white w-full hover:bg-green-700 m-3 translate-y-[180%] group-hover:translate-y-0 duration-500">
                        + Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
