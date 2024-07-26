"use client";
import { CommentInter, User } from "@/types";
import Image from "next/image";
import calculateTime from "../utilityFunctions/calculateTime";
import { useState } from "react";
import Login from "./Login";

const Comment = ({
  comment,
  commentsLoading,
  user,
  updateComments,
}: {
  comment: CommentInter;
  commentsLoading: boolean;
  user: User;
  updateComments: React.Dispatch<React.SetStateAction<CommentInter[]>>;
}) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedCommentContent, setUpdatedCommentContent] = useState<string>(
    comment.content
  );
  const [updatedComment, setUpdatedComment] = useState<CommentInter>(comment);
  const [loggedOut, setLoggedOut] = useState<boolean>(false);

  const handleUpvote = async () => {
    try {
      if (!user) {
        setLoggedOut(true);
        document.body.style.overflow = "hidden";

        return;
      }
      const response = await fetch(
        `${backendUrl}/comments/upvote/${comment?._id}/${user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.message === "Upvote created") {
          setUpdatedComment({
            ...updatedComment,
            upvotes: [...updatedComment.upvotes, user._id],
            downvotes: updatedComment.downvotes.filter(
              (downvote) => downvote.toString() !== user._id.toString()
            ),
          });
        } else {
          setUpdatedComment({
            ...updatedComment,
            upvotes: updatedComment.upvotes.filter(
              (upvote) => upvote.toString() !== user._id.toString()
            ),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownvote = async () => {
    try {
      if (!user) {
        setLoggedOut(true);
        document.body.style.overflow = "hidden";

        return;
      }
      const response = await fetch(
        `${backendUrl}/comments/downvote/${comment?._id}/${user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.message === "Downvote created") {
          setUpdatedComment({
            ...updatedComment,
            downvotes: [...updatedComment.downvotes, user._id],
            upvotes: updatedComment.upvotes.filter(
              (upvotes) => upvotes.toString() !== user._id.toString()
            ),
          });
        } else {
          setUpdatedComment({
            ...updatedComment,
            downvotes: updatedComment.downvotes.filter(
              (downvotes) => downvotes.toString() !== user._id.toString()
            ),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setLoggedOut(false);
    document.body.style.overflow = "auto";
  };
  const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/comments/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updatedCommentContent }),
      });
      if (response.ok) {
        setUpdatedComment({
          ...updatedComment,
          content: updatedCommentContent,
        });
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
      setEditMode(false);
    }
  };
  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirm) return;

      const response = await fetch(`${backendUrl}/comments/${comment._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        updateComments((prev) =>
          prev.filter((prevComment) => prevComment._id !== comment._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loggedOut && (
        <Login
          close={handleClose}
          message="Please login to interact with posts !!"
        />
      )}
      {commentsLoading ? (
        <div className="flex flex-col gap-1 my-2">
          <div className="flex items-center gap-1  py-2">
            <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
            <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
          </div>
          <div className="px-7 py-2">
            <div className="bg-gray-200 h-4 w-24"></div>
            <div className="bg-gray-200 h-4 w-24"></div>
            <div className="bg-gray-200 h-4 w-24"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1 my-2">
          <div className="flex items-center gap-1  py-2">
            <Image
              className="rounded-full"
              loader={() => updatedComment.maker?.avatar}
              src={updatedComment.maker?.avatar}
              alt="peter"
              width={40}
              height={40}
            />
            <span>{updatedComment.maker?.username} </span>
            <span className="text-gray-400 text-sm">
              {calculateTime(updatedComment.createdAt.toString())}
            </span>
            <div className="ml-auto flex items-center gap-1">
              <button
                className={`ml-auto flex items-center gap-1 text-sm border border-gray-300 rounded-[20px] hover:bg-gray-300 p-2 ${
                  updatedComment.maker?._id !== user?._id && "hidden"
                } `}
                onClick={() => setEditMode((prev) => !prev)}
              >
                <Image
                  src={"/images/edit.svg"}
                  height={20}
                  width={20}
                  alt="edit"
                />{" "}
                Edit
              </button>
              <button
                className={`ml-auto flex items-center gap-1 text-sm border border-gray-300 rounded-[20px] hover:bg-gray-300 p-2 ${
                  updatedComment.maker?._id !== user?._id && "hidden"
                } `}
                onClick={deleteComment}
              >
                <Image
                  src={"/icons/delete.svg"}
                  height={20}
                  width={20}
                  alt="delete"
                />{" "}
                Remove
              </button>
            </div>
          </div>
          <div className="px-8">
            {editMode ? (
              <form onSubmit={updateComment}>
                <input
                  className="w-full rounded-[15px] p-2 "
                  value={updatedCommentContent}
                  onChange={(e) => setUpdatedCommentContent(e.target.value)}
                  autoFocus
                ></input>
              </form>
            ) : (
              <p>{updatedComment.content}</p>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div
              className={`rounded-[25px] bg-white flex gap-1 px-3 py-2 items-center`}
            >
              <Image
                src={
                  updatedComment.upvotes?.includes(user?._id)
                    ? "/images/thumbsupSelected.svg"
                    : "/images/thumbsup.svg"
                }
                onClick={handleUpvote}
                height={20}
                width={20}
                alt="thumbsup"
                className="cursor-pointer hover:transform hover:scale-150"
              />
              <strong className="text-sm">
                {updatedComment.upvotes?.length -
                  updatedComment.downvotes?.length}{" "}
              </strong>
              <Image
                onClick={handleDownvote}
                src={
                  updatedComment.downvotes?.includes(user?._id)
                    ? "/images/thumbsdownSelected.svg"
                    : "/images/thumbsdown.svg"
                }
                height={20}
                width={20}
                alt="thumbsdown"
                className="cursor-pointer hover:transform hover:scale-150"
              />
            </div>{" "}
            <div className="rounded-[25px] bg-white hover:bg-gray-200 flex gap-1 px-3 py-2 items-center cursor-pointer ">
              <Image
                src={"/images/comment.svg"}
                height={20}
                width={20}
                alt="upvote"
              />
              <strong className="text-sm">Reply</strong>
            </div>
            <div className="rounded-[25px] bg-white hover:bg-gray-200 flex gap-1 px-3 py-2 items-center cursor-pointer ">
              <Image
                src={"/images/achievement.svg"}
                height={20}
                width={20}
                alt="upvote"
              />
              <strong className="text-sm">Award</strong>
            </div>{" "}
            <div className="rounded-[25px] bg-white hover:bg-gray-200 flex gap-1 px-3 py-2 items-center cursor-pointer ">
              <Image
                src={"/images/share.svg"}
                height={20}
                width={20}
                alt="upvote"
              />
              <strong className="text-sm">Share</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
