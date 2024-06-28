import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";


export default function CodePassword() {
  let navigate = useNavigate();
  const [apierror, setApierror] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  // let validationSchema = Yup.object().shape({
  //   resetCode:Yup.string().matches(/^[0-9]{6}$/,'password is invalid').required('password is required'),
  // })
  function handleCodePassword() {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , formik.values)
    .then((Response)=>{
      console.log(Response);
      // if (Response?.data.message == "success") {
      //   setIsLoading(false);
      //   // navegate("/");
      // }
    })
    .catch((errors)=>{
      setIsLoading(false);
      console.log(errors.message);
    })
  }
  let formik = useFormik({
    initialValues: {
      resetCode: ""
    },
    // validationSchema,
    onSubmit: handleCodePassword,
  });
  return (
    <>
      <div className="py-4 max-w-xl mx-auto">
        {
          apierror?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert">{apierror}
        </div>:null
        }
        

        <h2 className="font-bold text-4xl text-green-700 py-4">
        Verify Code
        </h2>
        <form onSubmit={formik.handleSubmit} className="py-4">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              type="number"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              resetCode
            </label>
          </div>

          {formik.errors.resetCode && formik.touched.resetCode ?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.resetCode}
        </div>:null}

          <button
            type="submit"
            className="text-white
            
            bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:' Verify Code'}
            
          </button>
        </form>
      </div>
    </>
  );
}


