"use client";
import { Group } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Popular = () => {
  const [groups, setgroups] = useState([]);
  const fetchPopularGroups = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/top3`
      );
      const data = await response.json();
      console.log("your data");
      console.log(data);

      setgroups(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPopularGroups();
  }, []);
  return (
    <div className="hidden xl:flex flex-col w-[350px] fixed top-[47px] right-0 h-[calc(100vh-47px)] bg-white shadow-md">
      <div className="bg-gray-200 rounded-[15px] mt-6 w-[80%] ml-3">
        <div className="text-gray-400 mb-3 px-4 mt-4 text-sm">
          POPULAR COMMUNITIES
        </div>
        <div className="flex flex-col gap-5 px-3">
          {groups.map((group: Group) => (
            <Link href={`/group/${group._id}`} key={group._id} className="flex gap-2 mb-2">
                <Image
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group._id}`
                  }
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group._id}`}
                  width={40}
                  height={40}
                  alt={group.name}
                  className="rounded-full object-cover h-[50px] w-[50px]"
                />
              <div className="flex flex-col gap-1">
                <strong className="text-sm">{group.name}</strong>
                <p className="text-sm text-gray-500">
                  {group.members.length} members
                </p>
              </div>
            </Link>
          ))}

          <strong className="px-2 text-sm py-4 cursor-pointer">
            See more ...
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Popular;
