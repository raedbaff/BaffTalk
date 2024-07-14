"use client";
import GroupBody from "@/app/components/GroupBody";
import GroupHeader from "@/app/components/GroupHeader";
import { Group } from "@/types";
import React, { useEffect, useState } from "react";

const GroupDetails = ({ params }: { params: { id: string } }) => {
  const [group, setgroup] = useState<Group>();
  const fetchGroup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/${params.id}`
      );
      if (response.ok) {
        const data = await response.json(); 
        setgroup(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGroup();
  }, [params.id]);
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
      <GroupHeader group={group} />
      <GroupBody group={group} />
    </div>
  );
};

export default GroupDetails;
