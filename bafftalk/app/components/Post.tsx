"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";

type Post = {
  id: number;
  userImage: string;
  username: string;
  postDescription: string;
  date: string;
  postImage: string;
  likes: number;
  comments: number;
};
const Post = ({ post }: { post: Post }) => {
  const [sortBy, setSortBy] = useState("New");
  const [sort, setSort] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    setSort(false);
  };
  return (
    <div className="flex flex-col w-full h-auto">
      {/* header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between gap-1">
          <Image
            src={post.userImage}
            width={30}
            height={30}
            alt="peter"
            className="rounded-full"
          />
          <strong className="text-sm">{post.username}</strong>
          <span className="text-gray-400 text-sm">{post.date}</span>
        </div>
        {/* Move the button container to the end */}
        <div className="ml-auto flex gap-1">
          <button className="rounded-[25px] bg-blue-800 text-white px-2 text-[12px] font-bold">
            Join
          </button>
          <div>...</div>
        </div>
      </div>
      {/* post desc and photo */}
      <div className="flex flex-col gap-2">
        <p className="mt-2 px-2">{post.postDescription}</p>
        <div className="relative h-[500px]">
          <Image
            src={post.postImage}
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
            <strong className="text-sm">{post.likes} </strong>
            <Image
              src={"/images/downvote.svg"}
              height={20}
              width={20}
              alt="downvote"
              className="cursor-pointer"
            />
          </div>
          <div onClick={()=>setOpenComments(true)} className="rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center cursor-pointer ">
            <Image
              src={"/images/comment.svg"}
              height={20}
              width={20}
              alt="upvote"
            />
            <strong className="text-sm">{post.comments} </strong>
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

      <hr className="border-t-1 border-gray-300 my-2 w-full"></hr>
    </div>
  );
};

export default Post;
