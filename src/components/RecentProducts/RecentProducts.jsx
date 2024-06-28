import React, { useContext, useEffect, useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import { PropagateLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../hooks/useProducts";
import { cartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../contexts/WishListContext";
export default function RecentProducts() {
  let { addToWishlist } = useContext(wishListContext);
  let { addToCart } = useContext(cartContext);
  async function addToWish(productId) {
    let response = await addToWishlist(productId);
    toast.success(`${response?.data.message}`, {
      duration: 4000,
      position: "bottom-left",
    });
  }
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
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
  let { data, isLoading, isError, error, isFetching } = useProducts();
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center">
        <PropagateLoader color="green" />
      </div>
    );
  }
  return (
    <>
      <div className="row">
        {data.map((product) => (
          <div key={product.id} className="w-full overflow-hidden lg:w-1/6 p-2">
            <div className="inner group p-2 relative">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img className="w-full" src={product.imageCover} alt="" />
                <h3 className="font-normal text-green-600 text-base">
                  {product.category.name}
                </h3>
                <p className="font-medium text-slate-900">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="flex w-full justify-between py-2">
                  <p className="font-normal text-slate-900">
                    {product.price} EGP
                  </p>
                  <p>
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <span>{product.ratingsAverage}</span>
                  </p>
                </div>
              </Link>
              <div>
                <i
                  onClick={() => addToWish(product.id)}
                  className="fa-regular cursor-pointer absolute -left-20 top-1 group-hover:top-4 group-hover:left-6 duration-500 z-20 fa-heart font-light text-green-500 text-3xl"
                ></i>
              </div>
              <button
                onClick={() => addProductToCart(product.id)}
                className="btn btn-green font-normal translate-y-[200%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-700"
              >
                {" "}
                + Add To Cart{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
