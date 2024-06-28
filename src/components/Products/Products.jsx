import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.css";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { cartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
import { wishListContext } from "../../contexts/WishListContext";
export default function Products() {
  let { addToCart, setNumOfCartItems } = useContext(cartContext);
  const [inWishList, setInWishList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  let { data, isLoading } = useProducts();
  let { addToWishlist, getWishList } = useContext(wishListContext);
  async function getWish() {
    let response = await getWishList();
    setInWishList(response?.data);
  }
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
  function getCategoriesName() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data?.data);
      })
      .catch((error) => {});
  }
  function getBrandsName() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data?.data);
      })
      .catch((error) => {});
  }
  getCategoriesName();
  getBrandsName();

  if (isLoading)
    return (
      <div className="pt-10 h-screen flex justify-center">
        <PropagateLoader color="green" />
      </div>
    );
  function getRelatedProducts(category) {
    let allProducts = data;
    let related = allProducts.filter(
      (product) => product.category.name == category
    );
    data = related;
    console.log(data);
  }
  return (
    <>
      <h2 className="text-slate-950 text-3xl font-semibold mt-10 ms-5 mb-4">
        All Popular Products
      </h2>
      <div className="row gap-x-2 justify-center">
        <div className="w-full lg:w-3/12">
          <div className="bg-[#b8c8af] p-6 pe-20 my-2 lg:my-0 rounded-xl">
            <div>
              <h3 className="py-2 text-slate-900 font-medium text-2xl">
                Category :{" "}
              </h3>
              {categories.map((category) => (
                <p
                  key={category._id}
                  onClick={() => getRelatedProducts(category.name)}
                  className="py-1 text-slate-800 font-normal text-lg cursor-pointer"
                >
                  {category.name}
                </p>
              ))}
            </div>
            <div>
              <h3 className="py-2 text-slate-900 font-medium text-2xl">
                Brands :{" "}
              </h3>
              <form className="max-w-sm">
                <label
                  htmlFor="brands"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an brands
                </label>
                <select
                  id="brands"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option>All</option>
                  {brands.map((brand) => (
                    <option value={brand.name} key={brand._id}>
                      {" "}
                      {brand.name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div>
              <h3 className="py-2 text-slate-900 font-medium text-2xl mt-6">
                Rating
              </h3>
              <p className="py-1 text-slate-600 font-normal text-sm">
                The Result Includes Min Rating To Your <br /> Chose
              </p>
              <div className="py-4">
                <i className="fa-solid fa-star text-green-700 px-1 text-xl"></i>
                <i className="fa-solid fa-star text-green-700 px-1 text-xl"></i>
                <i className="fa-solid fa-star text-green-700 px-1 text-xl"></i>
                <i className="fa-solid fa-star text-green-700 px-1 text-xl"></i>
                <i className="fa-solid fa-star text-green-700 px-1 text-xl"></i>
              </div>
              <button className="btn btn-green group overflow-hidden  font-medium hover:bg-red-800 duration-500">
                Clear All{" "}
                <span className="">
                  <i className="text-xl p-2 fa-solid fa-trash translate-x-[1000%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-8/12 border rounded-xl shadow p-4">
          <div>
            <div className="flex">
              <h4 className="text-green-700 text-lg font-medium ">
                40 products found{" "}
              </h4>
              <div>
                <hr color="" />
              </div>
            </div>
            <div className="row">
              {data.map((product) => (
                <div
                  key={product.id}
                  className="w-full overflow-hidden lg:w-1/4 p-2"
                >
                  <div className="inner group p-2">
                    <Link
                      className="group"
                      to={`/productdetails/${product.id}/${product.category.name}`}
                    >
                      <div className="overflow-hidden border relative p-2 rounde rounded-xl hover:border-2 hover:border-green-600 duration-200">
                        <img
                          className="w-full group-hover:scale-125 duration-500"
                          src={product.imageCover}
                          alt=""
                        />
                        <i
                          onClick={() => addToWish(product.id)}
                          className="fa-regular absolute -left-10 top-1 group-hover:top-1 group-hover:left-2 duration-500 z-20 fa-heart font-light text-green-500 text-3xl"
                        ></i>
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
                    </Link>
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
          </div>
        </div>
      </div>
    </>
  );
}
