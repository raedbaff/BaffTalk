import Image from "next/image";
import Link from "next/link";
import React from "react";
interface groupComponent {
    index: number;
    image: string;
    groupName : string;
    groupCategory : string;
    groupMembers : number;
    link:string;
}

const GroupComponent:React.FC<groupComponent> = ({index,image,groupName,groupCategory,groupMembers,link}) => {
  return (
    <Link href={link} className="flex items-center gap-1 py-2 cursor-pointer hover:bg-gray-100 px-2">
      <span className="mr-4">{index}</span>
      <Image
        className="rounded-full w-[40px] h-[40px]"
        loader={() => image}
        src={image}
        height={1000}
        width={1000}
        alt="groupImage"
      />
      <div className="flex flex-col gap-0 ml-2">
        <strong className="font-bold text-[12px] ">{groupName} </strong>
        <span className="text-gray-600 text-[11px]">{groupCategory} </span>
        <span className="text-gray-500 text-[11px]">{groupMembers} members</span>
      </div>
    </Link>
  );
};

export default GroupComponent;
