import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();
export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function removeItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        setNumOfCartItems(response?.data?.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }
  function ubdateItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        setNumOfCartItems(response?.data?.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setNumOfCartItems(response?.data?.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }
  useEffect(() => {
    getCartItems();
  }, [])
  
  return (
    <>
      <cartContext.Provider
        value={{
          addToCart,
          getCartItems,
          removeItem,
          ubdateItem,
          numOfCartItems,
        }}
      >
        {props.children}
      </cartContext.Provider>
    </>
  );
}
