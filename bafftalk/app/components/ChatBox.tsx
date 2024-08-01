"use client";
import Image from "next/image";
import React, { useState } from "react";
interface ChatBoxProps {
    opened: boolean;
    reduced: boolean;
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleReduceChatBox: React.Dispatch<React.SetStateAction<boolean>>;
  }
  const ChatBox: React.FC<ChatBoxProps> = ({ opened,reduced, setChatOpen,handleReduceChatBox }) => {
    const handleClose = () => {
      setChatOpen((prev) => !prev);
    };
    const handleReduce = ()=>{
        handleReduceChatBox((prev)=>!prev)
    }
  return (
    opened && !reduced && (
      <div className="flex flex-col bg-white border rounded-[20px] fixed bottom-0 right-0 h-[50%] w-[100%] md:w-[60%] lg:-w-[50%] xl:w-[40%] ">
        <div className="flex px-3 py-3 ">
          <span>New Chat</span>
          <div className="ml-auto flex gap-2">
            <div onClick={handleReduce} className="cursor-pointer rounded-full h-7 w-7 p-2 hover:bg-gray-200 flex flex-col justify-center items-center">
              <Image
                src={"/images/reduce.svg"}
                height={20}
                width={20}
                alt="reduce"
              />
            </div>
            <div onClick={handleClose} className="cursor-pointer rounded-full h-7 w-7 p-2 hover:bg-gray-200 flex flex-col justify-center items-center">
              <Image
                src={"/images/close.svg"}
                height={20}
                width={20}
                alt="close"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between h-full w-full">
          <div className="h-full w-[50%] flex flex-col">
            <span className="text-gray-400 font-bold text-sm p-3">Friends</span>
            <div className="flex items-center gap-1 cursor-pointer my-1 hover:border hover:bg-gray-300 rounded-[20px]">
              <Image
                src={"/images/peter.png"}
                width={30}
                height={30}
                alt="peter"
                className="rounded-full"
              />
              <strong className="text-sm">Peter</strong>
              <div className="w-2 h-2 rounded-full bg-green-600 ml-2"></div>
            </div>
            <div className="flex items-center gap-1 cursor-pointer my-1 hover:border hover:bg-gray-300 rounded-[20px]">
              <Image
                src={"/images/peter.png"}
                width={30}
                height={30}
                alt="peter"
                className="rounded-full"
              />
              <strong className="text-sm">Peter</strong>
            </div>

            <div className="flex items-center gap-1 cursor-pointer my-1 hover:border hover:bg-gray-300 rounded-[20px]">
              <Image
                src={"/images/peter.png"}
                width={30}
                height={30}
                alt="peter"
                className="rounded-full"
              />
              <strong className="text-sm">Peter</strong>
            </div>
          </div>
          <div className="bg-gray-300 h-full w-full flex flex-col">
            <div className="mt-auto flex w-full bg-white p-2 ">
              <input
                className="w-full rounded-[20px] border border-black px-2 py-1"
                type="text"
                placeholder="Send Message"
              ></input>
              <Image
                className="ml-auto cursor-pointer "
                src={"/images/send.svg"}
                width={30}
                height={30}
                alt="send"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;
