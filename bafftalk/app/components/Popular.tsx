import Image from "next/image";
import React from "react";

const Popular = () => {
  return (
    <div className="hidden xl:flex flex-col w-[350px] fixed top-[47px] right-0 h-[calc(100vh-47px)] bg-white shadow-md">
      <div className="bg-gray-200 rounded-[15px] mt-6 w-[80%] ml-3">
        <div className="text-gray-400 mb-3 px-4 mt-4 text-sm">
          POPULAR COMMUNITIES
        </div>
        <div className="flex flex-col gap-5 px-3">
          <div className="flex gap-2 mb-2">
            <Image
              src={"/images/peter.png"}
              width={40}
              height={40}
              alt="group"
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <strong className="text-sm">name of the group</strong>
              <p className="text-sm text-gray-500">6145987 members</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Image
              src={"/images/peter.png"}
              width={40}
              height={40}
              alt="group"
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <strong className="text-sm">name of the group</strong>
              <p className="text-sm text-gray-500">6145987 members</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Image
              src={"/images/peter.png"}
              width={40}
              height={40}
              alt="group"
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <strong className="text-sm">name of the group</strong>
              <p className="text-sm text-gray-500">6145987 members</p>
            </div>
          </div>
          <strong className="px-2 text-sm py-4 cursor-pointer">See more ...</strong>
        </div>
      </div>
    </div>
  );
};

export default Popular;
