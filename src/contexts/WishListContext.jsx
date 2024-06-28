import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext();

export default function WishListContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [WishListNumber, setWishListNumber] = useState(0);

  function addToWishlist(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setWishListNumber(response?.data.count);
        return response;
      })
      .catch((error) => error);
  }

  function getWishList() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((response) => {
        setWishListNumber(response?.data.count);
        return response;
      })
      .catch((error) => error);
  }

  function removeFromWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((response) => {
        setWishListNumber(response?.data.count);

        return response;
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <wishListContext.Provider
      value={{
        addToWishlist,
        setWishListNumber,
        WishListNumber,
        getWishList,
        removeFromWishlist,
      }}
    >
      {props.children}
    </wishListContext.Provider>
  );
}
