"use client";
import Image from "next/image";
import React, { useState } from "react";
import MyProfileContent from "../components/MyProfileContent";
import UserInfoModal from "../components/UserInfoModal";
import Link from "next/link";

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [displayInfo,setDisplayInfo]=useState(false)
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px] xl:w-[calc(100vw-255px-355px)] xl:ml-[255px] xl:mr-[355px]">
        <UserInfoModal displayInfo={displayInfo} setDisplayInfo={setDisplayInfo} />
      <div className="flex">
        <div className="w-full">
          <div className="flex p-2">
            <Image
              className="rounded-[20px]"
              src={"/images/peter.png"}
              height={300}
              width={120}
              alt="peter"
            />
            <div className="flex flex-col">
              <div className="mt-auto flex flex-col gap-1 px-4 py-2">
                <div className="flex gap-2 items-center">
                  <strong className="font-bold text-lg">Raed Baff </strong>
                  <Image
                    onClick={()=>setDisplayInfo(true)}
                    className="cursor-pointer"
                    src={"/images/info.svg"}
                    width={25}
                    height={25}
                    alt="info"
                  />
                </div>
                <span className="text-sm text-gray-400">u/Raed_Baff</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-auto">
            <div
              className={`px-3 py-2 rounded-[25px] ${
                selectedMenu === "Overview" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Overview")}
            >
              Overview
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] ${
                selectedMenu === "Posts" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Posts")}
            >
              Posts
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] ${
                selectedMenu === "Comments" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Comments")}
            >
              Comments
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] ${
                selectedMenu === "Saved" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Saved")}
            >
              Saved
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] ${
                selectedMenu === "Upvoted" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Upvoted")}
            >
              Upvoted
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] ${
                selectedMenu === "Downvoted" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Downvoted")}
            >
              Downvoted
            </div>
          </div>
          <Link href={"/createPost"} className="flex gap-1 mt-2">
            <button className="flex items-center border border-black rounded-[25px] px-2 py-1 ">
              <Image
                src={"/images/plus.svg"}
                alt="addPost"
                width={20}
                height={20}
              />
              <span className="text-[13px]">Create a Post </span>
            </button>
          </Link>
          <hr className="border-gray-300 my-0 w-full mt-2"></hr>
          <div className="mt-2 flex justify-center items-center">
            <MyProfileContent contentType={selectedMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
