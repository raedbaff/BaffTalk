import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-[250px] fixed top-[47px] left-0 h-[calc(100vh-47px)] bg-white shadow-md">
      <div className="mt-2 p-2 mb-2">
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer bg-gray-200 border-none rounded-[10px]">
          <Image src={"/images/home.svg"} width={20} height={20} alt="home" />
          Home
        </div>
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer ">
          <Image
            src={"/images/explore.svg"}
            width={20}
            height={20}
            alt="explore"
          />
          Popular
        </div>
        <hr className="border-t-1 border-gray-300 my-0 w-full mt-2"></hr>
      </div>
      <div className="mt-2 p-2 mb-2">
        <div className="mb-3">
          <span className="text-gray-400 p-2 ml-3">Topics</span>
        </div>
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer ">
          <Image src={"/images/gaming.svg"} width={20} height={20} alt="home" />
          Gaming
        </div>

        <hr className="border-t-1 border-gray-300 my-0 w-full mt-2"></hr>
      </div>
      <div className="mt-2 p-2 mb-2">
        <div className="mb-3">
          <span className="text-gray-400 p-2 ml-3">Resources</span>
        </div>
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer ">
          <Image src={"/images/about.svg"} width={20} height={20} alt="home" />
          About raedtalk
        </div>
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer">
          <Image src={"/images/help.svg"} width={20} height={20} alt="home" />
          Help
        </div>
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer ">
          <Image src={"/images/policy.svg"} width={20} height={20} alt="home" />
          Policy
        </div>
        <div className="flex items-center p-2 ml-3 gap-1 mb-1 cursor-pointer ">
          <Image src={"/images/blog.svg"} width={20} height={20} alt="home" />
          Blog
        </div>

        <hr className="border-t-1 border-gray-300 my-0 w-full mt-2"></hr>
      </div>
      <div>
        <span className="text-[10px] px-4 text-gray-400 fixed bottom-1">Reddit, Inc. © 2024. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Sidebar;
