import Image from "next/image";
import React from "react";

const ConfirmBox = ({message,closeModal,deleteGroup}:{message:string,closeModal:()=>void,deleteGroup:()=>void}) => {
  return (
    <div className="fixed bg-black bg-opacity-50 z-[60] inset-0 flex flex-col items-center justify-center">
      <div className="bg-white h-[45%] w-[80%] md:h-[40%] md:w-[60%] lg:h-[35%] lg:w-[50%] xl:h-[30%] xl:w-[40%] flex flex-col animate-scaleUp ">
        <div className="h-[40%] bg-gray-200 flex flex-col items-center justify-center">
          <Image src={"/images/question.svg"} height={60} width={60} alt="question" />
          <strong className="text-red-600 underline font-bold">This action cannot be undone</strong>

        </div>
        <div className="flex flex-col items-center justify-center gap-1 flex-1 ">
          <h2 className="text-2xl">Confirmation</h2>
          <p>{message}</p>
          <div className="flex items-center justify-center gap-4">
          <button onClick={deleteGroup} className="bg-green-600 text-white rounded-[20px] py-1 px-4 my-2 ">Yes</button>
          <button onClick={closeModal} className="bg-red-600 text-white rounded-[20px] py-1 px-4 my-2 ">No</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
