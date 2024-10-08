"use client";
import { Group } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "./loading";
import ConfirmBox from "./ConfirmBox";

const GroupHeader = ({
  group,
  setgroup,
}: {
  group: Group | undefined;
  setgroup: any;
}) => {
  const [loading, setLoading] = useState(true);
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
  const { GlobalUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Set loading to false once GlobalUser is available
    if (GlobalUser) {
      setLoading(false);
    }
  }, [GlobalUser]);

  const deleteGroup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/${group?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setshowConfirmDelete(false);
        router.push("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const joinOrLeaveGroup = async () => {
    try {
      console.log("before");
      console.log(group?.members);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/${GlobalUser?._id}/${group?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        if (data.success === "User added to group successfully") {
          setgroup({
            ...group,
            members: [...(group?.members || []), GlobalUser?._id],
          });
        } else {
          setgroup({
            ...group,
            members: group?.members.filter((id) => id !== GlobalUser?._id),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loading type={"spin"} color="black" />
      </div>
    ); // or render a loading indicator while GlobalUser is loading
  }
  return (
    <div className="md:h-[180px] w-full ">
      {showConfirmDelete && (
        <ConfirmBox
          message="Are you sure you want to delete this group ?"
          closeModal={() => {
            setshowConfirmDelete(false);
          }}
          deleteGroup={deleteGroup}
        />
      )}
      <div className="relative w-full">
        {group?.groupCoverImage && group?.groupCoverImage !== "" ? (
          <Image
            className="object-cover w-[98%] h-[90px] md:h-[160px] rounded-[15px] "
            loader={() =>
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/coverphoto/${group?._id}`
            }
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/coverphoto/${group?._id}`}
            height={3000}
            width={3000}
            alt="cover"
          />
        ) : (
          <Image
            className="object-cover w-[98%] h-[90px] md:h-[160px] rounded-[15px] "
            src={"/images/cover.jpg"}
            height={3000}
            width={3000}
            alt="cover"
          />
        )}

        <div className=" absolute bottom-[-55px] flex items-center w-full bg-[transparent] ">
          <Image
            className=" rounded-full object-cover h-[50px] w-[50px] md:h-[100px] md:w-[100px] "
            loader={() =>
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group?._id}`
            }
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group?._id}`}
            height={100}
            width={100}
            alt="goup"
          />
          <span className="md:mt-auto ml-2 text-xs md:text-3xl font-bold font-mono">
            {group?.name}
          </span>
          <div className="ml-auto mt-auto flex items-center gap-2">
            <button
              onClick={() => {
                router.push("/createPost");
              }}
              className="ml-auto p-[6px] bg-white rounded-[20px] flex items-center text-black border border-gray-600 text-xs md:text-lg"
            >
              <Image
                src={"/images/plus.svg"}
                width={30}
                height={30}
                alt="createGroup"
              />
              Create Post
            </button>
            {group?.maker === GlobalUser?._id && (
              <button
                onClick={() => {
                  setshowConfirmDelete(true);
                }}
                className="ml-auto px-3 py-[6px] text-white text-xs md:text-lg bg-red-600 rounded-[20px] flex items-center border border-gray-600"
              >
                Delete
              </button>
            )}
            {group?.members?.includes(GlobalUser?._id) ? (
              <button
                onClick={joinOrLeaveGroup}
                className="ml-auto px-3 py-[6px] text-white text-xs md:text-lg bg-red-600 rounded-[20px] flex items-center border border-gray-600"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={joinOrLeaveGroup}
                className="ml-auto px-3 py-[6px] text-white text-xs md:text-lg bg-blue-600 rounded-[20px] flex items-center border border-gray-600"
              >
                Join
              </button>
            )}

            <button className="rounded-full px-4 py-[6px] border border-black ">
              ...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
