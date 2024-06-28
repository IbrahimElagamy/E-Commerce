import React, { useContext, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "../../assets/finalProject assets/images/freshcart-logo.svg";
import { UserContext } from "../../contexts/UserContext";
import { cartContext } from "../../contexts/CartContext";
import { wishListContext } from "../../contexts/WishListContext";

export default function Navbar() {
  let { WishListNumber } = useContext(wishListContext);
  let { numOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="z-50 bg-gray-100 p-4 flex flex-col lg:flex-row lg:justify-between static lg:fixed top-0 left-0 right-0">
        <div className="container mx-auto px-10 lg:flex lg:justify-between">
          <div className="flex justify-between items-center">
            <Link className="my-5 lg:my-0 me-4" to={""}>
              <img src={logo} className="w-36" alt="logo" />
            </Link>
            <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
              &#9776;
            </div>
          </div>
          <div className={`lg:flex ${isOpen ? "block" : "hidden"}`}>
            {userLogin !== null ? (
              <ul className="flex flex-col lg:flex-row">
                <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                  <NavLink className="p-1 px-2" to={""}>
                    Home
                  </NavLink>
                </li>
                <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                  <NavLink className="py-1 px-2" to={"Cart"}>
                    Cart
                  </NavLink>
                </li>
                <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                  <NavLink className="py-1 px-2" to={"products"}>
                    Products
                  </NavLink>
                </li>
                <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                  <NavLink className="py-1 px-2" to={"categories"}>
                    Categories
                  </NavLink>
                </li>
                <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                  <NavLink className="py-1 px-2" to={"brands"}>
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}
            <hr className="block lg:hidden" />
            <ul className="flex flex-col lg:flex-row items-center px-4">
              <span className="flex gap-x-4 my-4 lg:my-0">
                <Link>
                  <i className="fa-brands fa-instagram text-slate-800"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-facebook text-slate-800"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-tiktok text-slate-800"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-twitter text-slate-800"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-linkedin text-slate-800"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-youtube text-slate-800"></i>
                </Link>
              </span>
              {userLogin == null ? (
                <>
                  <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                    <NavLink className="py-1 px-2" to={"login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="text-slate-600 my-2 lg:my-0 font-light text-xl">
                    <NavLink className="py-1 px-2" to={"register"}>
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <Link to={"wishlist"}>
                    <li className="text-slate-600 px-2 my-2 lg:my-0 relative">
                      <p className="py-[1px] px-2 rounded-lg bg-slate-600 absolute -top-1/4 right-0 text-white">
                        {WishListNumber}
                      </p>
                      <i className="fa-regular fa-heart font-light text-green-500 text-3xl"></i>
                    </li>
                  </Link>
                  <li className="text-slate-600 px-2 my-2 lg:my-0 relative">
                    <Link to={"Cart"}>
                      <p className="py-[1px] px-2 rounded-lg bg-green-500 absolute -top-1/4 right-0 text-white">
                        {numOfCartItems}
                      </p>
                      <i className="fa-solid fa-cart-shopping font-light text-3xl"></i>
                    </Link>
                  </li>
                  <li
                    className="text-slate-600 my-2 lg:my-0 font-light text-xl"
                    onClick={logout}
                  >
                    <Link className="py-1 px-2">Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}