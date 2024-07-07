import React from "react";
import { topics } from "../../data";
import Image from "next/image";
const Topic = ({ name, photo }: { name: string; photo: string }) => {
  return (
    <div className="flex items-center p-2 mt-2 gap-1 mb-1 cursor-pointer hover:bg-gray-300 ">
      <Image src={photo} width={20} height={20} alt="home" />
      {name}
    </div>
  );
};

export default Topic;
