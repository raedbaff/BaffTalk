import { Group, PostType } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Post from "./Post";

const GroupBody = ({ group,posts,loading }: { group: Group | undefined, posts:PostType[],loading:boolean }) => {
  const [collapsedItemId,setCollapsedItemId]=useState<Number[]>([])
  const { GlobalUser } = useAuth();
  const handleCollapse = (index:Number)=>{
    let ids=[...collapsedItemId]
    if (ids.includes(index)) {
        ids=ids.filter((id)=>id!==index)
    }
    else {
        ids.push(index)
    }
    setCollapsedItemId(ids)


  }

  return (
    <div className="mt-[60px] flex flex-col md:flex-row">
      <div className="flex flex-col-reverse lg:flex-row gap-1 w-full">
      <div className="w-full lg:w-[70%]">
        {posts.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center h-full">
          {" "}
          <Image src={"/images/404.svg"} alt="404" width={60} height={60} />
          <p className="font-bold text-3xl">
            No posts in this group yet
          </p>
        </div>
        ):(
           posts.map((post) => (
            <div key={post?._id}>
              <Post key={post._id} post={post} loading={loading} />
              <hr className="border-t-1 border-gray-300 my-2 w-full"></hr>
            </div>
          ))
        )}
       
      </div>
      <div className="w-full lg:w-[30%] bg-gray-50 overflow-auto flex flex-col gap-1 p-2 mr-4">
        <span className="font-bold text-md">{group?.name}</span>
        <p className="text-sm text-gray-700">{group?.description} </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 p-2">
            Members
            <strong>{group?.members?.length} </strong>
          </div>
          <div className="flex flex-col gap-1 p-2">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>Online
            </span>
            <strong>{group?.members?.length} </strong>
          </div>
          <div className="flex flex-col gap-1 p-2">
            Rank by size
            <strong>{group?.members?.length} </strong>
          </div>
        </div>
        <div className="w-full border border-gray-200"></div>
        <div className="flex flex-col gap-1 ">
          <span className="text-md text-gray-500 p-2">User Flair</span>
          <div className="flex items-center gap-2">
            <Image
              loader={() => GlobalUser?.avatar}
              className="rounded-full w-9 h-9 object-fill"
              src={GlobalUser?.avatar}
              height={30}
              width={30}
              alt="user"
            />
            <span className="text-sm font-medium">{GlobalUser?.username} </span>
          </div>
        </div>
        <div className="w-full border border-gray-200 my-2"> </div>
        <div className="flex flex-col gap-1 ">
          <span className="text-md text-gray-500 p-2">Topic</span>
          <div className="flex gap-2">
            <div className="px-3 py-2 bg-gray-300 text-black rounded-[25px] border ">
              {group?.topic}
            </div>
            <div className="px-3 py-2 bg-gray-300 text-black rounded-[25px] border ">
              {group?.name}
            </div>
          </div>
        </div>
        <div className="w-full border border-gray-200 my-2"> </div>
        <div className="flex flex-col gap-1 ">
          <span className="text-md text-gray-500 p-2">Rules</span>
          {group?.rules && group?.rules?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {group?.rules.map((rule, index) => (
                <div
                  onClick={()=>{handleCollapse(index)}}
                  key={rule?._id}
                  className="bg-gray-300"
                >
                  <div className="px-3 cursor-pointer hover:bg-gray-200 py-2 flex items-center  text-black w-full ">
                    {index + 1} . {rule?.name}{" "}
                    <Image
                      className="ml-auto"
                      src={"/images/arrowDown.svg"}
                      height={15}
                      width={15}
                      alt="arrowDown"
                    />
                  </div>
                    <div className={`px-3 cursor-default py-2 text-black w-full ${collapsedItemId.includes(index) ? 'block':'hidden'}`}>
                      <span className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-black mt-1"></div>
                        <span className="ml-2">
                          {rule?.description}
                        </span>
                      </span>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2">No Rules but do not get carried away, we expect you to be an adult </div>
          )}
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default GroupBody;
