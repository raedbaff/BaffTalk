"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import ChatBox from "./ChatBox";
import ReducedChatBox from "./ReducedChatBox";
import ProfilePopup from "./ProfilePopup";
import NotificationsPopup from "./NotificationsPopup";
import {  useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "./loading";

const NavbarUserSection = () => {
  const { GlobalUser,loading } = useAuth();
  

  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
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
    <>
    {loading? (
        <Loading type={'bars'} color="orange" />
    ):(
        !GlobalUser ? (
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
              <Link
                href={"/createPost"}
                className="flex gap-1 items-center mr-2 cursor-pointer"
              >
                <Image
                  src={"/images/plus.svg"}
                  height={25}
                  width={25}
                  alt="create"
                />
                <span className="text-sm font-bold">Create</span>
              </Link>
              <div
                onClick={() => setOpenNotifications((prev) => !prev)}
                className="relative"
              >
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
                  loader={() => GlobalUser.avatar}
                  onClick={() => setProfilePopupOpen((prev) => !prev)}
                  className="rounded-full"
                  src={GlobalUser.avatar}
                  height={35}
                  width={35}
                  alt="user"
                />
                <div className="w-2 h-2 rounded-full absolute bottom-0 right-0 bg-green-600"></div>
              </div>
            </div>
          )
    )}
      
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
      {openNotifications && <NotificationsPopup />}
    </>
  );
};

export default NavbarUserSection;
