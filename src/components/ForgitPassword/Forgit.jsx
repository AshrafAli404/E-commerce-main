import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";


import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Forgit() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoding] = useState(false);
  let navigate = useNavigate();
 
  
  useEffect(() => {}, []);

 async function forget(formValue) {
    
   
   
      try{ 
        
         setIsLoding(true);
         
        let{data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValue)
               console.log(data);
               
               if(data.statusMsg ==='success'){
                navigate('/resetCode')
               }
          }
       
        
      catch(err){
        setApiError(err?.response?.data?.message);
        setIsLoding(false);
      }

       
  }

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("Invalid email address").required("required"),
     
    });
  };
  let myForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forget,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>forget</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {apiError && (
        <div
          className=" max-w-xl mx-auto md:w-full p-4 mb-4 text-sm pt-7 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{apiError}</span>
        </div>
      )}
      <form
        onSubmit={myForm.handleSubmit}
        className=" max-w-xl mx-auto md:w-full bg-slate-50 p-2  rounded-xl items-center justify-center my-40 "
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email:
          </label>
          <input
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.email}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="email"
          />
          {myForm.errors.email && myForm.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{myForm.errors.email}</span>
            </div>
          ) : null}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-30 p-6 mt-4"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "resetCode"}
        </button>

      </form>
    </>
  );
}