import Image from "next/image";
import React from "react";
import Post from "./Post";
import { PostType } from "@/types";
import ProfilePosts from "./ProfilePosts";

const MyProfileContent = ({
  contentType,
  user,
}: {
  contentType: string;
  user: any;
}) => {
  let content;
  switch (contentType) {
    case "Overview":
      content = (
        <>
          {user?.posts?.length === 0 ? (
            <div className="flex flex-col gap-2 w-full justify-center items-center mt-2 ">
              {" "}
              <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
              <p className="font-bold text-lg">
                {user?.username} hasn&apos;t posted yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-[90%] justify-center items-start mt-2">
              {user?.posts?.map((post: PostType) => (
                <ProfilePosts key={post._id} post={post} avatar={user.avatar} />
              ))}
            </div>
          )}
        </>
      );
      break;
    case "Posts":
      content = (
        <div className="flex flex-col gap-2 justify-center items-center mt-2">
          <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
          <p className="font-bold text-lg">Raed_Baff hasn&apos;t posted yet</p>
        </div>
      );
      break;
    case "Comments":
      content = (
        <div className="flex flex-col gap-2 justify-center items-center mt-2">
          <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
          <div>
            <p className="font-bold text-lg">
              Raed_Baff hasn&apos;t commented yet
            </p>
          </div>
        </div>
      );
      break;
    case "Saved":
      content = (
        <div className="flex flex-col gap-2 justify-center items-center mt-2">
          <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
          <p className="font-bold text-lg">
            Raed_Baff hasn&apos;t saved any posts yet
          </p>
        </div>
      );
      break;
    case "Upvoted":
      content = (
        <div className="flex flex-col gap-2 justify-center items-center mt-2">
          <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
          <p className="font-bold text-lg">
            Raed_Baff hasn&apos;t upvoted any posts yet
          </p>
        </div>
      );
      break;
    case "Downvoted":
      content = (
        <div className="flex flex-col gap-2 justify-center items-center mt-2">
          <Image src={"/images/404.svg"} alt="404" width={50} height={50} />
          <p className="font-bold text-lg">
            Raed_Baff hasn&apos;t Downvoted any posts yet
          </p>
        </div>
      );
      break;
  }
  return content;
};

export default MyProfileContent;
