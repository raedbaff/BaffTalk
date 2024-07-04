"use client"
import Link from "next/link";
import React from "react";

const Login = ({ close }: { close: () => void }) => {
  const googleLogin = async () =>{
    try {
      
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
      

    }
    catch(error){
      console.log(error);
      
    }
  }
  const handleLogIn = async () => {
    try {

      const response = await fetch("/api/auth", {
        method: "GET",
      });
      if (!response.ok) {
        console.log("response");
        console.log(await response.json());
      }
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white relative md:rounded-[20px] h-screen w-screen md:h-[80%] md:w-[55%] lg:w-[45%] xl:w-[35%]  flex flex-col">
        <div className="font-bold text-black text-2xl p-5 mt-5 ">Log in</div>
        <button onClick={close} className="absolute top-4 right-4 text-2xl">
          &times;
        </button>
        <p className="px-3 mt-2 text-[13px]">
          {" "}
          By continuing, you agree to our{" "}
          <Link className="text-blue-400" href={"/"}>
            User Agreement
          </Link>{" "}
          and acknowledge that you understand the{" "}
          <Link className="text-blue-400" href={"/"}>
            Privacy Policy
          </Link>
        </p>
        <div className="flex flex-col justify-center items-center">
          <button onClick={googleLogin} className="flex items-center mt-3 w-[90%] bg-white dark:bg-gray-900 border border-gray-300 rounded-[25px] shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="800px"
              height="800px"
              viewBox="-0.5 0 48 48"
              version="1.1"
            >
              {" "}
              <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  {" "}
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    {" "}
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      id="Fill-1"
                      fill="#FBBC05"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      id="Fill-2"
                      fill="#EB4335"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      id="Fill-3"
                      fill="#34A853"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      id="Fill-4"
                      fill="#4285F4"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </svg>
            <span>Continue with Google</span>
          </button>
          <span className="text-gray-400 font-bold text-2xl mt-3 mb-2">OR</span>
          <form onSubmit={handleLogIn} className="px-6 py-2 flex flex-col w-full">
            <input
              className="border bg-gray-300 w-full rounded-[25px] px-6 py-2 font-medium mb-3"
              type="text"
              placeholder="Email or Username"
            ></input>
            <input
              className="border bg-gray-300 w-full rounded-[25px] px-6 py-2 font-medium "
              type="password"
              placeholder="Password"
            ></input>
            <Link className="text-blue-400 px-3 py-3 text-sm" href={"/"}>
              Forgot password ?
            </Link>
            <div className="px-3 py-3">
              <span className="text-sm">
                New to bafftalk ?{" "}
                <Link className="text-blue-400 text-sm" href={"/"}>
                  Create account
                </Link>
              </span>
            </div>
            <button className="border rounded-[25px] w-full items-center px-6 py-2 wf bg-gray-200">
                Log in
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
