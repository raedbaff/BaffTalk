"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { CommentInter, PostType } from "@/types";
import { useAuth } from "../context/AuthContext";
import calculateTime from "../utilityFunctions/calculateTime";
import Login from "./Login";

const ProfilePosts = ({
  post,
  loading,
  avatar,
}: {
  post: PostType;
  loading?: boolean;
  avatar: string;
}) => {
  const [sortBy, setSortBy] = useState("New");
  const [sort, setSort] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [updatedPost, setupdatedPost] = useState<PostType>(post);
  const [comments, setComments] = useState<CommentInter[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const { GlobalUser } = useAuth();

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    setSort(false);
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/post/${updatedPost._id}`
      );
      if (response.ok) {
        const data = await response.json();

        setComments(data.comments);
        setCommentsLoading(false);
      }
    } catch (error) {
      setCommentsLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!GlobalUser) {
        setLoggedOut(true);
        document.body.style.overflow = "hidden";

        return;
      }
      const comment = {
        content: newComment,
        maker: GlobalUser?._id,
        post: updatedPost?._id,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        await fetchComments();
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setLoggedOut(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col w-full h-auto bg-gray-100 hover:bg-gray-200 rounded-[20px] cursor-pointer shadow-lg p-2 ">
      {loggedOut && (
        <Login
          close={handleClose}
          message="Please login to interact with posts !!"
        />
      )}
      {/* header */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center justify-between gap-1">
          <Image
            loader={() => avatar}
            src={avatar}
            width={30}
            height={30}
            alt="peter"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <strong className="text-sm">
                {updatedPost?.maker?.username}
              </strong>
              <span className="text-gray-400 text-sm">
                {calculateTime(updatedPost?.createdAt.toString())}
              </span>
            </div>
            <strong className="text-[12px] text-gray-600">
              {updatedPost?.group?.name}
            </strong>
          </div>
        </div>
        {/* Move the button container to the end */}
      </div>
      {/* post desc and photo */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col mx-2 my-1">
          <span className="text-xl font-extrabold">{updatedPost?.title} </span>
          <p className="">{updatedPost.description}</p>
        </div>

        <div className="relative h-[500px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/photo/${updatedPost?._id}`}
            loader={() =>
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/photo/${updatedPost?._id}`
            }
            layout="fill"
            objectFit="cover"
            alt="post"
            className="rounded-[25px]"
          />
        </div>

        <div className="flex gap-2">
          <div
            className={`rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center`}
          >
            <Image
              src={"/images/upvote.svg"}
              height={20}
              width={20}
              alt="upvote"
            />
            <strong className="text-sm">
              {(updatedPost.upvotes?.length || 0) -
                (updatedPost.downvotes?.length || 0)}{" "}
            </strong>
            <Image
              src={"/images/downvote.svg"}
              height={20}
              width={20}
              alt="downvote"
            />
          </div>
          <div
            onClick={() => {
              setOpenComments((prev) => !prev);
              fetchComments();
            }}
            className="rounded-[25px] bg-gray-300 flex gap-1 px-3 py-2 items-center cursor-pointer "
          >
            <Image
              src={"/images/comment.svg"}
              height={20}
              width={20}
              alt="upvote"
            />
            <strong className="text-sm">
              {updatedPost.comments?.length || 0}{" "}
            </strong>
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
          <form onSubmit={handleSubmit}>
            <input
              className="w-full rounded-[20px] bg-gray-50 px-4 py-1 mt-2 border border-gray-400"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              type="text"
              placeholder="post a comment"
              value={newComment}
            ></input>
          </form>

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
          {comments.length === 0 ? (
            <div className="flex items-center justify-center h-[120px] ">
              <strong>No Comments Yet, Be the first to comment</strong>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment
                updateComments={setComments}
                key={comment._id}
                user={GlobalUser}
                comment={comment}
                commentsLoading={commentsLoading}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
