"use client";
import GroupComponent from "@/app/components/GroupComponent";
import { Group } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const SpecificGroups = ({ params }: { params: { topic: string } }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const fetchGroups = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/topic/${params.topic}`
      );
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
      <div className="text-xl font-bold flex items-center justify-center  mt-2 ">
        Best of Bafftalk
      </div>
      <div className="flex flex-col gap-2 ">
        <span className="font-bold">{params.topic} groups</span>
        <span className="text-sm text-gray-500">
          Browse the largest {params.topic} groups
        </span>
        {groups.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center mt-[200px]">
            <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
            <p className="font-bold text-lg">
              No groups found for{" "}
              <strong className="text-orange-700">{params.topic}</strong> for
              now
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4  py-2 px-3 mt-4">
            {groups.map((group, index) => (
              <GroupComponent
                key={group?._id}
                index={index + 1}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group?._id}`}
                groupName={group?.name}
                groupCategory={group?.topic}
                groupMembers={group?.members?.length}
                link={`/group/${group?._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificGroups;
