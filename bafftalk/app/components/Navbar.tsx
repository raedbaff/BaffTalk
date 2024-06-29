"use client";
import Image from "next/image";
import Menu from "./Menu";
import { useState } from "react";
import Login from "./Login";
import ChatBox from "./ChatBox";
import ReducedChatBox from "./ReducedChatBox";
import ProfilePopup from "./ProfilePopup";
import Link from "next/link";

const Navbar = () => {
  const user = "user";
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };
  const handleOpenChatBox = () => {
    setChatOpen((prev) => !prev);
  };
  const handleReduceChatBox = () => {
    setReduced((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <nav className="flex items-center justify-between gap-4 lg:gap-8 py-3 px-4 h-[47px]">
        {/* Left Section */}
        <Link href={"/"} className="flex items-center gap-2">
          <Menu />
          <Image
            src={"/logos/reddit.svg"}
            width={30}
            height={30}
            alt="bafftalk"
          />
          <h1 className="text-orange-500 hidden lg:block font-bold">
            BAFFTALK
          </h1>
        </Link>

        {/* Center Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full lg:w-[70%]">
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
        </div>

        {/* Right Section */}
        {!user ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleClick}
              className="bg-orange-600 rounded-[25px] py-2 px-4 text-white font-bold"
            >
              Log In
            </button>
            <div className="text-2xl cursor-pointer">...</div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div onClick={handleOpenChatBox}>
              <Image
                className="cursor-pointer"
                src={"/images/chat.svg"}
                height={25}
                width={25}
                alt="chat"
              />
            </div>
            <Link href={"/createPost"} className="flex gap-1 items-center mr-2 cursor-pointer">
              <Image
                src={"/images/plus.svg"}
                height={25}
                width={25}
                alt="create"
              />
              <span className="text-sm font-bold">Create</span>
            </Link>
            <div className="relative">
              <div className="w-4 h-4 bg-orange-600 rounded-full absolute right-[-5px] top-[-5px] text-white text-[10px] font-bold flex justify-center items-center">
                5
              </div>

              <Image
                className="cursor-pointer"
                src={"/images/bell.svg"}
                height={25}
                width={25}
                alt="notification"
              />
            </div>
            <div className="cursor-pointer relative">
              <Image
                onClick={()=>setProfilePopupOpen((prev)=>!prev)}
                className="rounded-full"
                src={"/images/peter.png"}
                height={35}
                width={35}
                alt="user"
              />
              <div className="w-2 h-2 rounded-full absolute bottom-0 right-0 bg-green-600"></div>
            </div>
          </div>
        )}
      </nav>
      <hr className="border-t-1 border-gray-300 my-0 w-full"></hr>
      {open && <Login close={handleClose} />}
      <ChatBox
        opened={chatOpen}
        reduced={reduced}
        setChatOpen={setChatOpen}
        handleReduceChatBox={handleReduceChatBox}
      />
      <ReducedChatBox
        reduced={reduced}
        handleReduceChatBox={handleReduceChatBox}
        handleOpenChatBox={handleOpenChatBox}
      />
      {profilePopupOpen && <ProfilePopup />}
    </div>
  );
};

export default Navbar;
