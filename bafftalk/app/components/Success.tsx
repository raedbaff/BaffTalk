import Image from "next/image";
import React from "react";

const Success = ({message,closeModal}:{message:string,closeModal:()=>void}) => {
  return (
    <div className="fixed bg-black bg-opacity-50 z-[60] inset-0 flex flex-col items-center justify-center">
      <div className="bg-white h-[45%] w-[80%] md:h-[40%] md:w-[60%] lg:h-[35%] lg:w-[50%] xl:h-[30%] xl:w-[40%] flex flex-col animate-scaleUp ">
        <div className="h-[40%] bg-orange-500 flex flex-col items-center justify-center">
          <Image src={"/images/success.svg"} height={60} width={60} alt="success" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 flex-1 ">
          <h2 className="text-2xl">Great</h2>
          <p>{message}</p>
          <button onClick={closeModal} className="bg-orange-600 text-white rounded-[20px] py-1 px-4 my-2 ">Great</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
