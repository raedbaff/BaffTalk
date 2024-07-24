"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { PostType } from "@/types";
import { useAuth } from "../context/AuthContext";

const Post = ({ post, loading }: { post: PostType; loading: boolean }) => {
 
  const [sortBy, setSortBy] = useState("New");
  const [sort, setSort] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const { GlobalUser} = useAuth();
  post.createdAt = new Date(post.createdAt).toLocaleDateString();

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    setSort(false);
  };
  return (
    <div className="flex flex-col w-full h-auto hover:bg-gray-50 rounded-[20px] cursor-pointer ">
      {/* header */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center justify-between gap-1">
          <Image
            loader={() => post?.maker?.avatar}
            src={post?.maker?.avatar}
            width={30}
            height={30}
            alt="peter"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <strong className="text-sm">{post?.maker?.username}</strong>
            <strong className="text-[12px] text-gray-600">
              {post?.group?.name}
            </strong>
          </div>
          <span className="text-gray-400 text-sm">{post?.createdAt}</span>
        </div>
        {/* Move the button container to the end */}
        <div className="ml-auto flex gap-1">
          {post.maker?._id === GlobalUser?._id ? (
            <button className={`rounded-[25px] bg-blue-600 hover:bg-blue-800
             text-white px-2 text-[12px] font-bold`}>
            Edit
          </button>
          ):(
            <button className={`rounded-[25px] bg-blue-800 text-white px-2 text-[12px] font-bold`}>
            Join
          </button>
          )}
          
          <div>...</div>
        </div>
      </div>
      {/* post desc and photo */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col mx-2 my-1">
          <span className="text-xl font-extrabold">{post?.title} </span>
          <p className="">{post.description}</p>
        </div>

        <div className="relative h-[500px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/photo/${post?._id}`}
            loader={() =>
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/photo/${post?._id}`
            }
            layout="fill"
            objectFit="cover"
            alt="post"
            className="rounded-[25px]"
          />
        </div>

        <div className="flex gap-2">
          <div className="rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center  ">
            <Image
              src={"/images/upvote.svg"}
              height={20}
              width={20}
              alt="upvote"
              className="cursor-pointer"
            />
            <strong className="text-sm">{post.upvotes?.length} </strong>
            <Image
              src={"/images/downvote.svg"}
              height={20}
              width={20}
              alt="downvote"
              className="cursor-pointer"
            />
          </div>
          <div
            onClick={() => setOpenComments((prev)=>!prev)}
            className="rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center cursor-pointer "
          >
            <Image
              src={"/images/comment.svg"}
              height={20}
              width={20}
              alt="upvote"
            />
            <strong className="text-sm">{post.comments?.length} </strong>
          </div>
          <div className="rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center cursor-pointer ">
            <Image
              src={"/images/share.svg"}
              height={20}
              width={20}
              alt="upvote"
            />
            <strong className="text-sm">Share </strong>
          </div>
        </div>
      </div>
      {openComments && (
        <div>
          <input
            className="w-full rounded-[20px] bg-gray-50 px-4 py-1 mt-2 border border-gray-400"
            type="text"
            placeholder="post a comment"
          ></input>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-[12px] text-gray-600 px-2">Sort By : </div>
            <div className="relative">
              <div
                onClick={() => setSort((prev) => !prev)}
                className="flex items-center gap-2 text-[12px] text-gray-700 border bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-[20px] px-3 py-1"
              >
                {sortBy}
                <Image
                  src={"/images/arrowDown.svg"}
                  height={10}
                  width={10}
                  alt="arrowDown"
                />
              </div>
              {sort && (
                <div className="absolute w-[150px] z-[60] bg-white flex flex-col gap-2 border border-gray-300 rounded shadow-lg p-2">
                  <strong className="px-2 py-1">Sort by</strong>
                  <div
                    onClick={() => handleSort("New")}
                    className="w-full px-4 flex items-center gap-2 py-2 hover:cursor-pointer hover:bg-gray-200 "
                  >
                    <Image
                      src={"/icons/new.svg"}
                      alt="new"
                      width={20}
                      height={20}
                    />
                    New
                  </div>
                  <div
                    onClick={() => handleSort("Old")}
                    className="w-full px-4 flex items-center gap-2 py-2 hover:cursor-pointer hover:bg-gray-200 "
                  >
                    <Image
                      src={"/icons/trash.svg"}
                      alt="new"
                      width={20}
                      height={20}
                    />
                    Old
                  </div>
                  <div
                    onClick={() => handleSort("Top")}
                    className="w-full px-4 flex items-center gap-2 py-2 hover:cursor-pointer hover:bg-gray-200 "
                  >
                    <Image
                      src={"/icons/rocket.svg"}
                      alt="new"
                      width={20}
                      height={20}
                    />
                    Top
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search Comments"
                className="rounded-[25px] bg-gray-50 border-gray-800 border py-1 pl-10 pr-4"
              />
              <Image
                src={"/icons/search.svg"}
                width={15}
                height={15}
                alt="search"
                className="absolute left-3 top-[50%] transform -translate-y-1/2"
              />
            </div>
          </div>
          <Comment />
          <Comment />
        </div>
      )}
    </div>
  );
};

export default Post;
