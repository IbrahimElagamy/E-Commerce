import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../contexts/CartContext";
import cartemptyImg from "../../assets/finalProject assets/images/cartempty.jpeg";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import visaLogo from "../../assets/images/visa-1.svg";
import cashLogo from "../../assets/images/cash-on-delivery.png";

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cartDetails, setCartDetails] = useState(0);
  let {
    getCartItems,
    removeItem,
    ubdateItem,
    numOfCartItems,
  } = useContext(cartContext);
  async function getCart() {
    let response = await getCartItems();
    setCartDetails(response?.data);
    setTotalPrice(response?.data?.data.totalCartPrice);
    setIsLoading(false);
  }
  async function removeProduct(productId) {
    let response = await removeItem(productId);
    if (response.data.status === "success") {
      setTotalPrice(response?.data?.data.totalCartPrice);
      toast.error("Item removed from your cart", {
        duration: 4000,
        position: "bottom-left",
      });
    }
    setCartDetails(response.data);
    setIsLoading(false);
    setTotalPrice(response?.data?.data.totalCartPrice);
  }

  async function ubdateProduct(productId, count) {
    if (count < 1) return;
    let response = await ubdateItem(productId, count);
    setCartDetails(response?.data);
    setTotalPrice(response?.data?.data.totalCartPrice);
    setIsLoading(false);
  }
  useEffect(() => {
    getCart();
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
      {numOfCartItems > 0 ? (
        <>
          <div className="my-6 row justify-evenly">
            <div className="w-1/2">
              <h3 className="font-bold text-2xl text-slate-800 my-1">
                Shop Cart
              </h3>
              <p className="text-green-500 font-medium mb-4">
                totla price: ${totalPrice}
              </p>
              <p className="text-slate-600 font-medium my-2">
                All Orders {numOfCartItems}
              </p>
            </div>

            <div className="w-11/12 flex justify-end">
              {" "}
              <button className="px-6 py-2 rounded-lg m-2 bg-green-700 text-white w-auto group overflow-hidden font-medium hover:bg-red-800 duration-500">
                Clear All{" "}
                <span className="">
                  <i className="text-xl p-2 fa-solid fa-trash translate-x-[1000%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500"></i>
                </span>
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-3/4 mx-auto my-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.data.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            ubdateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>{product.count}</div>
                        <button
                          onClick={() =>
                            ubdateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => removeProduct(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-5 border-green-500 w-10/12 mx-auto " />
            <button className="w-9/12 mx-auto flex justify-center items-center text-lg font-bold hover:bg-slate-900 py-2 my-2 rounded-xl bg-slate-950 text-white">
              Online Payment{" "}
              <img className="w-14 mx-1" src={visaLogo} alt="visaLogo" />{" "}
            </button>
            <button className="w-9/12 mx-auto flex justify-center items-center border-2 border-green-600 text-lg font-bold hover:bg-green-600 hover:text-white py-2 my-4 rounded-xl text-green-600 ">
              Online Payment{" "}
              <img className="w-10 mx-1" src={cashLogo} alt="cashLogo" />{" "}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="h-screen row justify-center">
            <img
              className="w-full h-4/5"
              src={cartemptyImg}
              alt="cartemptyImg"
            />
            <h3 className="my-2 text-green-600 font-bold text-4xl">
              Your shopping cart is empty
            </h3>
          </div>
        </>
      )}
    </>
  );
}
