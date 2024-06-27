import React, { SetStateAction } from "react";
interface reducedChatBox {
  reduced: boolean;
  handleReduceChatBox: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenChatBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReducedChatBox: React.FC<reducedChatBox> = ({
  reduced,
  handleReduceChatBox,
  handleOpenChatBox,
}) => {
  const cancelReduce = () => {
    handleReduceChatBox((prev) => !prev);
  };
  const closeReducedBox = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleOpenChatBox(false);
    handleReduceChatBox(false);
  };
  return (
    reduced && (
      <div
        onClick={cancelReduce}
        className="cursor-pointer fixed bottom-0 right-4 h-[50px] w-[150px] bg-gray-100 z-50 shadow-md rounded-lg border border-gray-200 flex flex-col gap-1"
      >
        <div className="p-2 flex items-center ">
          <p className="text-gray-800">Chat</p>

          <button onClick={closeReducedBox} className="ml-auto text-2xl">
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default ReducedChatBox;
