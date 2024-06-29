import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction } from "react";

const UserInfoModal = ({ displayInfo,setDisplayInfo }: { displayInfo: boolean,setDisplayInfo:React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    displayInfo && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-100 relative md:rounded-[20px] h-screen w-screen md:h-[80%] md:w-[55%] lg:w-[45%] xl:w-[35%]  flex flex-col">
          <div className="flex flex-col gap-2 p-6">
            <div className="flex items-center">
              <strong>Raed Baff</strong>

              <div className="ml-auto flex justify-center items-center my-1 text-white">
                <button onClick={()=>setDisplayInfo(false)} className="bg-red-500 border border-black rounded-[20px] px-2 py-1 ml-2">
                  Close
                </button>
              </div>
            </div>
            <div className="flex">
              <button className="flex items-center gap-2 p-2 bg-gray-300 rounded-[20px]">
                <Image
                  src={"/images/settings.svg"}
                  alt="settings"
                  width={25}
                  height={25}
                />
                <strong>Settings</strong>
              </button>
            </div>
          </div>
          <hr className="w-full py-0 border-gray-300 mt-2 mb-2"></hr>

          <div className="grid grid-cols-2 grid-rows-2 bg-gray-200">
            <div className="p-4">
              <strong>1</strong>
              <div>Post(s)</div>
            </div>
            <div className="p-4">
              <strong>1</strong>
              <div>comments</div>
            </div>
            <div className="p-4">
              <strong>1</strong>
              <div>Cake day</div>
            </div>
            <div className="p-4">
              <strong>1</strong>
              <div>something</div>
            </div>
          </div>
          <hr className="w-full py-0 border-gray-300 mt-2 mb-2"></hr>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-700 p-4">Links</span>
            <Link className="text-blue-500 underline ml-2" href="">
              raedbaffoun@gmail.com
            </Link>
            <Link className="text-blue-500 underline ml-2" href="">
              raedbaffoun@gmail.com
            </Link>

            <div className="flex ml-2">
              <button className="rounded-[25px] bg-white border border-black flex items-center px-2 py-1 ">
                <Image
                  src={"/images/plus.svg"}
                  alt="addLink"
                  width={25}
                  height={25}
                />
                Add social link
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoModal;
