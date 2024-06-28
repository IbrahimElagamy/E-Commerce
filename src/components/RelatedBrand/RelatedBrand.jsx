import React, { useContext, useEffect, useState } from "react";
import Style from "./RelatedBrand.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { cartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import emptyCart from "../../assets/images/emptycart.png";

export default function RelatedBrand() {
  let { addToCart, setNumOfCartItems } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);
  let { brand } = useParams();
  const [reletedProducts, setReletedProducts] = useState([]);
  function getRelatedProducts(brand) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.brand.name == brand
        );
        setReletedProducts(related);
        setIsLoading(false);
      })
      .catch(({ error }) => {
        setIsLoading(false);
      });
  }
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);
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
  useEffect(() => {
    getRelatedProducts(brand);
  }, []);
  return (
    <>
      {isLoading !== true ? (
        <>
          {reletedProducts.length !== 0 ? (
            <div className="row">
              {reletedProducts.map((product) => (
                <div key={product._id} className="w-full lg:w-1/6 p-6 group">
                  <div className="inner">
                    <Link
                      to={`/productdetails/${product.id}/${product.category.name}`}
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
                          {product.ratingsAverage}
                          <i className="fas fa-star text-yellow-500"></i>
                        </span>
                      </div>
                    </Link>
                    <div className="overflow-hidden p-3">
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="btn bg-green-800 text-white w-full hover:bg-green-700 m-3 translate-y-[180%] group-hover:translate-y-0 duration-500"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="h-[70vh] row items-center my-6">
                <div className="w-full">
                  <img
                    className="w-1/3 mx-auto"
                    src={emptyCart}
                    alt="emptyCart"
                  />
                  <h3 className="font-bold text-xl text-center my-6 text-slate-900 ">
                    We're sorry, but the product you're looking for is currently
                    unavailable
                  </h3>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="pt-10 text-center">
            <PropagateLoader color="green" />
          </div>
        </>
      )}
    </>
  );
}
