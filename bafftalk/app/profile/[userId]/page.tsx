"use client";
import MyProfileContent from "@/app/components/MyProfileContent";
import UserInfoModal from "@/app/components/UserInfoModal";
import { useAuth } from "@/app/context/AuthContext";
import { log } from "console";
import { get } from "http";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }: { params: { userId: string } }) => {
  const { GlobalUser } = useAuth();

  const [UserData, setUserData] = useState<any>();
  const [FriendRequest, setFriendRequest] = useState<any>();
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [displayInfo, setDisplayInfo] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/find/${params.userId}`
      );
      if (!response.ok) {
        router.replace("/notFound");
      }
      const data = await response.json();
      setUserData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getFriendRequestBetweenUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFriendRequestBetweenUsers/${GlobalUser?._id}/${params.userId}`
      );
      if (!response.ok) {
        setFriendRequest(null);
      } else {
        const data = await response.json();
        console.log(data);

        setFriendRequest(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addFriend = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sendFriendRequest/${GlobalUser?._id}/${params.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setFriendRequest(data.newFriendRequest);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    if (GlobalUser) getFriendRequestBetweenUsers();
  }, [params.userId, GlobalUser]);
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
      <UserInfoModal
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
      />
      <div className="flex">
        <div className="w-full">
          <div className="flex p-2">
            <div className="h-[120px] w-[140px] ">
              <Image
                loader={() => UserData?.avatar}
                className="rounded-[20px] w-full h-full"
                src={UserData?.avatar}
                height={300}
                width={120}
                alt="avatar"
              />
            </div>

            <div className="flex flex-col">
              <div className="mt-auto flex flex-col gap-1 px-4 py-2">
                <div className="flex gap-2 items-center">
                  <strong className="font-bold text-lg">
                    {UserData?.username}
                  </strong>
                  <Image
                    onClick={() => setDisplayInfo(true)}
                    className="cursor-pointer"
                    src={"/images/info.svg"}
                    width={25}
                    height={25}
                    alt="info"
                  />
                  {GlobalUser &&
                    UserData?.username !== GlobalUser?.username &&
                    (GlobalUser?.friends.includes(params.userId) ? (
                      <button className="flex items-center border mt-2 ml-5 bg-orange-500 text-white border-black rounded-[25px] px-3 py-2 ">
                        <Image
                          src={"/icons/profile.svg"}
                          alt="addPost"
                          width={20}
                          height={20}
                        />
                        <span className="text-[13px]">Friends</span>
                      </button>
                    ) : FriendRequest && FriendRequest.state === "pending" ? (
                      <button className="flex items-center border mt-2 ml-5 bg-orange-500 hover:bg-orange-600 text-white border-black rounded-[25px] px-3 py-2 ">
                        <Image
                          src={"/icons/add-friend.svg"}
                          alt="addPost"
                          width={20}
                          height={20}
                        />
                        <span className="text-[13px]">Pending </span>
                      </button>
                    ) : (
                      <button
                        onClick={addFriend}
                        className="flex items-center border mt-2 ml-5 bg-orange-500 hover:bg-orange-600 text-white border-black rounded-[25px] px-3 py-2 "
                      >
                        <Image
                          src={"/icons/add-friend.svg"}
                          alt="addPost"
                          width={20}
                          height={20}
                        />
                        <span className="text-[13px]">Add Friend </span>
                      </button>
                    ))}
                </div>
                <span className="text-sm text-gray-400">
                  u/{UserData?.username}
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

          <hr className="border-gray-300 my-0 w-full mt-2"></hr>
          <div className="mt-2 flex justify-start items-center">
            <MyProfileContent user={UserData} contentType={selectedMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
