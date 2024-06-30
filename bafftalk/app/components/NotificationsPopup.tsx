import Image from "next/image";
import React from "react";

const NotificationsPopup = () => {
  return (
    <div className="w-[270px] h-[400px] overflow-auto bg-white rounded-[10px] fixed top-[55px] right-4 z-[70] shadow-md border border-gray-200 ">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-center font-bold p-2 bg-gray-300 w-full ">
          <h3 className="font-mono mr-2 ">Notifications</h3>
          <Image
            src={"/images/bell.svg"}
            alt="notificatino"
            width={20}
            height={30}
          />
        </div>
        <div className="flex flex-col gap-4 justify-start p-2">
          <div className="flex items-center gap-1 cursor-pointer rounded-[15px] hover:border hover:bg-gray-200 ">
            <Image
              className="rounded-full"
              src={"/images/peter.png"}
              width={40}
              height={40}
              alt="user"
            />
            <div className="flex flex-col">
              <strong>Notification text</strong>
              <p className="text-sm text-gray-600 ">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPopup;
