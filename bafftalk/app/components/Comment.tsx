import { CommentInter } from "@/types";
import Image from "next/image";
import calculateTime from "../utilityFunctions/calculateTime";

const Comment = ({
  comment,
  commentsLoading,
  user,
}: {
  comment: CommentInter;
  commentsLoading: boolean;
  user: any;
}) => {

  return (
    <div>
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
              loader={() => comment.maker?.avatar}
              src={comment.maker?.avatar}
              alt="peter"
              width={40}
              height={40}
            />
            <span>{comment.maker?.username} </span>
            <span className="text-gray-400 text-sm">
              {calculateTime(comment.createdAt.toString())}
            </span>
            <button
              className={`ml-auto flex items-center gap-1 text-sm border border-gray-300 rounded-[20px] hover:bg-gray-300 p-2 ${
                comment.maker?._id !== user?._id && "hidden"
              } `}
            >
              <Image
                src={"/images/edit.svg"}
                height={20}
                width={20}
                alt="edit"
              />{" "}
              Edit
            </button>
          </div>
          <div className="px-8">
            <p>{comment.content}</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div
              className={`rounded-[25px] bg-white flex gap-1 px-3 py-2 items-center`}
            >
              <Image
                src={"/images/thumbsup.svg"}
                height={20}
                width={20}
                alt="thumbsup"
                className="cursor-pointer hover:transform hover:scale-150"
              />
              <strong className="text-sm">15</strong>
              <Image
                src={"/images/thumbsdown.svg"}
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
