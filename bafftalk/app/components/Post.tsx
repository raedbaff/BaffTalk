import Image from "next/image";
import React, { useEffect } from "react";

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
          <div className="rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center cursor-pointer ">
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
      <hr className="border-t-1 border-gray-300 my-2 w-full"></hr>
    </div>
  );
};

export default Post;
