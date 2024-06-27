"use client";
import Image from "next/image";
import Menu from "./Menu";
import { useState } from "react";
import Login from "./Login";
import ChatBox from "./ChatBox";
import ReducedChatBox from "./ReducedChatBox";

const Navbar = () => {
  const user="user";
  const [open, setOpen] = useState(false);
  const [chatOpen,setChatOpen]=useState(false)
  const [reduced,setReduced]=useState(false)
  const handleClick = () => {
    setOpen((prev) => !prev);
    document.body.style.overflow='hidden'
  };
  const handleOpenChatBox = ()=>{
    setChatOpen((prev)=>!prev)
  }
  const handleReduceChatBox = ()=>{
    setReduced((prev)=>!prev)
  }
  const handleClose =()=>{
    setOpen(false)
    document.body.style.overflow='auto'
  }
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <nav className="flex items-center justify-between gap-4 lg:gap-8 py-3 px-4 h-[47px]">
        {/* Left Section */}
        <div className="flex items-center gap-2">
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
        </div>

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
        {!user? (
           <div className="flex items-center gap-2">
           <button
             onClick={handleClick}
             className="bg-orange-600 rounded-[25px] py-2 px-4 text-white font-bold"
           >
             Log In
           </button>
           <div className="text-2xl cursor-pointer">...</div>
         </div>
        ):(
          <div className="flex gap-2 items-center">
            <div onClick={handleOpenChatBox}>
              <Image className="cursor-pointer" src={"/images/chat.svg"} height={25} width={25} alt="chat" />
            </div>
            <div className="flex gap-1 mr-2 cursor-pointer">
              <Image src={"/images/plus.svg"} height={25} width={25} alt="create" />
              <span className="text-sm font-bold">Create</span>

            </div>
            <div>
              <Image className="cursor-pointer" src={"/images/bell.svg"} height={25} width={25} alt="notification" />
            </div> 
            <div className="cursor-pointer">
              <Image className="rounded-full" src={"/images/peter.png"} height={35} width={35} alt="user" />
            </div>
          </div>
        )}
       
      </nav>
      <hr className="border-t-1 border-gray-300 my-0 w-full"></hr>
      {open && <Login close={handleClose} />}
      <ChatBox opened={chatOpen}reduced={reduced}  setChatOpen={setChatOpen} handleReduceChatBox={handleReduceChatBox} />
      <ReducedChatBox reduced={reduced} handleReduceChatBox={handleReduceChatBox} handleOpenChatBox={handleOpenChatBox} />

    </div>
  );
};

export default Navbar;
