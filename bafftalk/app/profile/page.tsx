"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MyProfileContent from "../components/MyProfileContent";
import UserInfoModal from "../components/UserInfoModal";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { GlobalUser, setGlobalUser } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [displayInfo, setDisplayInfo] = useState(false);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [LoadingUserPosts, setLoadingUserPosts] = useState(true);
  const handleFileChange = async (e: any) => {
    try {
      const newForm = new FormData();
      newForm.append("avatar", e.target.files[0]);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/avatar/${GlobalUser?._id}`,
        {
          method: "PUT",
          body: newForm,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setGlobalUser({
          ...GlobalUser,
          avatar: data.avatar,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/find/${GlobalUser?._id}`
      );
      if (response.ok) {
        
        const data = await response.json();
        setLoadingUserPosts(false);
        setUserPosts(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [GlobalUser]);

  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
      <UserInfoModal
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
      />
      <div className="flex">
        <div className="w-full">
          <div className="flex p-2">
            <div className="relative h-[120px] w-[140px] ">
              <Image
                loader={() => GlobalUser?.avatar ? GlobalUser?.avatar : "/images/emptyAvatar.png"}
                className="rounded-[20px] cursor-pointer w-full h-full"
                src={GlobalUser?.avatar ? GlobalUser?.avatar : "/images/emptyAvatar.png"}
                height={300}
                width={120}
                alt="avatar"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex flex-col">
              <div className="mt-auto flex flex-col gap-1 px-4 py-2">
                <div className="flex gap-2 items-center">
                  <strong className="font-bold text-lg">
                    {GlobalUser?.username}
                  </strong>
                  <Image
                    onClick={() => setDisplayInfo(true)}
                    className="cursor-pointer"
                    src={"/images/info.svg"}
                    width={25}
                    height={25}
                    alt="info"
                  />
                </div>
                <span className="text-sm text-gray-400">
                  u/{GlobalUser?.username}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-auto">
            <div
              className={`px-3 py-2 rounded-[25px] cursor-pointer hover:bg-gray-400 ${
                selectedMenu === "Overview" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Overview")}
            >
              Overview
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] cursor-pointer hover:bg-gray-400 ${
                selectedMenu === "Posts" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Posts")}
            >
              Posts
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] cursor-pointer hover:bg-gray-400 ${
                selectedMenu === "Comments" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Comments")}
            >
              Comments
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] cursor-pointer hover:bg-gray-400 ${
                selectedMenu === "Saved" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Saved")}
            >
              Saved
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] cursor-pointer hover:bg-gray-400 ${
                selectedMenu === "Upvoted" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMenu("Upvoted")}
            >
              Upvoted
            </div>
            <div
              className={`px-3 py-2 rounded-[25px] cursor-pointer hover:bg-gray-400 ${
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
          <div className="mt-2 flex justify-start items-center">
            <MyProfileContent
              loading={LoadingUserPosts}
              user={userPosts}
              contentType={selectedMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
