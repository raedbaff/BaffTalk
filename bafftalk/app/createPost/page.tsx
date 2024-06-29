"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Topics from "../components/Topics";

const CreatePost = () => {
  const [chooseTopic, setChooseTopic] = useState(false);
  const handlebutton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setChooseTopic(true);
  };
  const handleClickAnywhere = () => {
    setChooseTopic(false);
  };
  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={handleClickAnywhere}
      className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px] xl:w-[calc(100vw-255px-355px)] xl:ml-[255px] xl:mr-[355px]"
    >
      <div className="p-6 flex flex-col ">
        <strong className="text-2xl ">Create Post</strong>
        <div className="mt-2 relative">
          <button
            onClick={handlebutton}
            className={`px-2 py-1 border border-black rounded-[25px] bg-gray-200 flex items-center gap-2 ${
              !chooseTopic ? "" : "hidden"
            }`}
          >
            <Image
              src={"/images/topic.svg"}
              alt="topic"
              height={25}
              width={25}
            />
            <span>Choose Topic</span>
            <Image
              className="ml-auto"
              src={"/images/arrowDown.svg"}
              alt="topic"
              height={25}
              width={25}
            />
          </button>
          <div
            className={`relative w-[50%] ${chooseTopic ? "block" : "hidden"}`}
            onClick={handleInputClick}
          >
            <input
              type="text"
              placeholder="Search bafftalk"
              className="rounded-[25px] bg-gray-200 py-2 pl-10 pr-4 w-full "
            />
            <Image
              src={"/icons/search.svg"}
              width={20}
              height={20}
              alt="search"
              className="absolute left-3 top-[50%] transform -translate-y-1/2"
            />
          </div>
          <Topics chooseTopic={chooseTopic} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
