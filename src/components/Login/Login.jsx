import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";


export default function Login() {
  let {setUserLogin} = useContext(UserContext);
  let navegate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApierror] = useState('')

  let validationSchema = Yup.object().shape({
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(/^[A-Z][0-9]{4,15}$/ , 'password is invalid').required('password is required'),
  })
  function handleLogin(formValues) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formValues)
    .then((Response)=>{
      if (Response?.data.message == "success") {
        setIsLoading(false);
        navegate("/");
        localStorage.setItem('userToken',Response?.data.token);
        setUserLogin(Response?.data.token);
      }
    })
    .catch((errors)=>{
      setIsLoading(false);
      setApierror(errors.response.data.message);
    })
    console.log(formValues);
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin,
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
          Login Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="py-4">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          {formik.errors.email && formik.touched.email ?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.email}
        </div>:null}


          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              password address
            </label>
          </div>

          {formik.errors.password && formik.touched.password ?<div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.password}
        </div>:null}

          <Link to={"/forgetpassword"} ><h4 className="text-green-600 text-xl font-normal my-2">Forget Password ?</h4></Link>
          


          <button
            type="submit"
            className="text-white
            
            bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:'Login'}
            
          </button>
        </form>
      </div>
    </>
  );
}

