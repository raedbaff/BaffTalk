"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePopup = () => {
  const {setGlobalUser,GlobalUser}=useAuth()
  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:4000/logout";

      setGlobalUser(null)
    } catch (error) {
      console.log(error);
      
    }
  };
  const [dark, setDark] = useState(false);
  return (
    <div className="w-[270px] bg-white rounded-[10px] fixed top-[55px] right-2 z-50 shadow-md border border-gray-200 ">
      <div className="flex flex-col gap-1 py-4">
        <Link
          href={"/profile"}
          className="flex gap-3 mb-2 items-center cursor-pointer hover:border h-[50px] p-5 hover:bg-gray-200"
        >
          <Image
          loader={()=>GlobalUser?.avatar ? GlobalUser?.avatar : "/images/emptyAvatar.png"}
            src={GlobalUser?.avatar ? GlobalUser?.avatar : "/images/emptyAvatar.png"}
            width={30}
            height={30}
            alt="group"
            className="rounded-full w-10 h-10 object-fill"
          />
          <div className="flex flex-col gap-1">
            <strong className="text-sm">View Profile</strong>
            <p className="text-sm text-gray-500">{GlobalUser.username}</p>
          </div>
        </Link>
        
        <div className="flex gap-3 mb-2 p-5 items-center cursor-pointer hover:border h-[50px] hover:bg-gray-200">
          <Image
            src={"/images/editavatar.svg"}
            width={25}
            height={25}
            alt="group"
            className="rounded-full"
          />
          <strong className="text-sm">Edit avatar</strong>
        </div>
        <Link href={"/FriendRequests"} className="flex gap-3 mb-2 p-5 items-center cursor-pointer hover:border h-[50px] hover:bg-gray-200">
          <Image
            src={"/icons/friend-request.svg"}
            width={25}
            height={25}
            alt="group"
            className="rounded-full"
          />
          <strong className="text-sm">Friend Requests</strong>
        </Link>
        <div className="flex gap-3 mb-2 p-5 items-center cursor-pointer hover:border h-[50px] hover:bg-gray-200">
          <Image
            src={"/images/achievement.svg"}
            width={25}
            height={25}
            alt="group"
            className="rounded-full"
          />
          <strong className="text-sm">Achievements</strong>
        </div>
        <div className="flex justify-between gap-3 mb-2 p-5 items-center h-[50px]">
          <Image
            src={"/images/dark.svg"}
            width={25}
            height={25}
            alt="group"
            className="rounded-full"
          />
          <strong className="text-sm">Dark Mode</strong>
          <div
            className={`relative w-[60px] h-[35px] ${
              !dark ? "bg-gray-200" : "bg-blue-500"
            } ml-auto flex items-center rounded-[25px] shadow-md border-gray-300`}
          >
            <div
              onClick={() => setDark((prev) => !prev)}
              className={`absolute left-[17px] h-full w-[65%] rounded-full bg-white cursor-pointer transition-transform duration-300 transform ${
                dark ? "translate-x-[1px]" : "translate-x-[-15px]"
              }`}
            ></div>
          </div>
        </div>

        <div
          onClick={handleLogout}
          className="flex gap-3 mb-2 p-5 items-center cursor-pointer hover:border h-[50px] hover:bg-gray-200"
        >
          <Image
            src={"/images/logout.svg"}
            width={25}
            height={25}
            alt="group"
            className="rounded-full"
          />
          <strong className="text-sm">Log out</strong>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
