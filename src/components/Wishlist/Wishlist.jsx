import React, { useContext, useEffect, useState } from "react";
import Style from "./Wishlist.module.css";
import { wishListContext } from "../../contexts/WishListContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

export default function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  let { setWishListNumber, WishListNumber , getWishList, removeFromWishlist } =
    useContext(wishListContext);
  const [wishListProducts, setWishListProducts] = useState([]);
  async function getWish() {
    let response = await getWishList();
    setWishListProducts(response?.data.data);
    setWishListNumber(response?.data.count);
    setIsLoading(false);
  }
  async function removeFromWish(productId){
    let response = await removeFromWishlist(productId);
    if(response.data.status = 'success'){
      toast.error(`${response?.data.message}`, {
        duration: 4000,
        position: "bottom-left",
      });
    }
    getWish();
    setIsLoading(false);
  }

  useEffect(() => {
    getWish();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <PropagateLoader color="green" />
      </div>
    );
  }
  return (
    <>
      <div className="row">
        {wishListProducts.map((product) => (
          <div key={product.id} className="w-full overflow-hidden lg:w-1/6 p-2">
            <div className="inner group p-2">
                <div className="overflow-hidden border relative p-2 rounde rounded-xl hover:border-2 hover:border-green-600 duration-200">
                  <img
                    className="w-full group-hover:scale-125 duration-500"
                    src={product.imageCover}
                    alt=""
                  />
                  <i onClick={()=>removeFromWish(product.id)} className="fa-solid absolute cursor-pointer -left-10 group-hover:top-1 group-hover:left-2 duration-500 z-50 fa-heart font-light text-green-500 text-3xl"></i>
                </div>
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
