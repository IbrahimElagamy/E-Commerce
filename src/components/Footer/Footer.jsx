import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./Footer.module.css";
import amazonepayLogo from "../../assets/finalProject assets/images/amazonepay.jpeg";
import ooLogo from "../../assets/finalProject assets/images/oo.jpeg";
import paypalLogo from "../../assets/finalProject assets/images/paypal.jpeg";
import appstoreLogo from "../../assets/finalProject assets/images/appstore.jpeg";
import googleplayLogo from "../../assets/finalProject assets/images/googleplay.jpeg";

export default function Footer() {
  return (
    <>
      <div className="p-8 py-12 bg-gray-100 ">
        <div className="px-2">
          <h2 className=" font-normal text-3xl text-slate-900">
            {" "}
            Get the FreshCart app{" "}
          </h2>
          <span className="text-xl my-2 block text-slate-500">
            We will send you a link,open it on your phone the download the app.
          </span>
        </div>
        <div className="row py-4">
          <div className="w-full lg:w-10/12 px-2 my-2 lg:my-0">
            <div>
              <input
                type="text"
                className=" text-sm rounded-lg focus:ring-offset-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="email..."
              />
            </div>
          </div>
          <div className="w-full lg:w-2/12 px-2 my-2 lg:my-0">
            <button className="bg-[#0aad0a] w-full py-2 rounded-xl text-white font-normal">
              Share App Link{" "}
            </button>
          </div>
          <div className="row w-full justify-between py-4">
            <div className="w-full lg:w-4/12 my-4 flex items-center">
              <div className="inner flex">
                <p className="font-normal text-xl text-slate-900">
                  Payment Partners{" "}
                </p>
              </div>
              <div className="mx-2">
                <img
                  className="w-20"
                  src={amazonepayLogo}
                  alt="amazonepayLogo"
                />
              </div>
              <div className="mx-2">
                <img className="w-20" src={ooLogo} alt="ooLogo" />
              </div>
              <div className="mx-2">
                <img className="w-20" src={paypalLogo} alt="paypalLogo" />
              </div>
            </div>
            <div className="w-full lg:w-4/12 my-4 flex items-center">
              <div className="inner">
                <p className="font-normal text-xl text-slate-900">
                  {" "}
                  Get deliveries with FreshCart{" "}
                </p>
              </div>
              <div className="mx-2">
                <img
                  className="w-[4.5rem]"
                  src={appstoreLogo}
                  alt="appstoreLogo"
                />
              </div>
              <div className="mx-2">
                <img
                  className="w-28"
                  src={googleplayLogo}
                  alt="googleplayLogo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
