"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Topics from "../components/Topics";
import TextEditor from "../components/TextEditor";

const CreatePost = () => {
  const [selectedPostType, setSelectedPostType] = useState("Text");
  const [wordCount, setWordCount] = useState(0);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setWordCount(inputText.length);
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
          <div className="flex gap-2 items-center mt-2 px-3 py-4">
            <div
              onClick={() => setSelectedPostType("Text")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm"
            >
              Text
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Text" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
            <div
              onClick={() => setSelectedPostType("Images & videos")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm "
            >
              Images & videos
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Images & videos" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
            <div
              onClick={() => setSelectedPostType("Link")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm "
            >
              Link
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Link" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-2 px-3 py-4 relative">
            <input
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 hover:bg-gray-200 rounded-[15px]"
              type="text"
              placeholder="Title *"
            ></input>
            <div className="absolute right-3 bottom-[-5px] text-[12px] ">
              {wordCount}/300
            </div>
          </div>
          {selectedPostType === "Text" && (
            <div className="mt-2 px-3 py-4">
              <TextEditor />
            </div>
          )}
          {selectedPostType === "Images & videos" && (
            <div className="mt-2 h-[100px] p-2 border border-gray-200 rounded-[15px] flex flex-col items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <label htmlFor="fileInput" className="cursor-pointer ">
                  <div className="flex gap-2 items-center">
                    <h1>Choose file</h1>{" "}
                    <Image
                      src={"/icons/upload.svg"}
                      alt="upload"
                      width={25}
                      height={25}
                    />
                  </div>
                  <input id="fileInput" className="hidden" type="file"></input>
                </label>
              </div>
            </div>
          )}
          {selectedPostType === "Link" && (
            <div className="flex gap-2 items-center mt-2 px-3 py-4">
              <input
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 hover:bg-gray-200 rounded-[15px]"
                type="text"
                placeholder="Link *"
              ></input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
