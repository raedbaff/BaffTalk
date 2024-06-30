import Image from "next/image";
import React from "react";
import Post from "./Post";

const Posts = () => {
  const posts = [
    {
      id: 1,
      userImage: "/images/peter.png",
      username: "Peter Griffin",
      postDescription: "Post desc",
      date: "21 hours ago",
      postImage: "/images/nature.jpg",
      likes: 50,
      comments: 60,
    },
    {
        id: 2,
        userImage: "/images/peter.png",
        username: "Lois Griffin",
        postDescription: "Beautiful day at the park!",
        date: "2 hours ago",
        postImage: "/images/nature.jpg",
        likes: 120,
        comments: 30,
      },
      {
        id: 3,
        userImage: "/images/peter.png",
        username: "Stewie Griffin",
        postDescription: "Plotting my next move...",
        date: "10 minutes ago",
        postImage: "/images/nature.jpg",
        likes: 200,
        comments: 150,
      },
      {
        id: 4,
        userImage: "/images/peter.png",
        username: "Brian Griffin",
        postDescription: "Just finished writing my novel.",
        date: "3 days ago",
        postImage: "/images/nature.jpg",
        likes: 75,
        comments: 20,
      }
  ];
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-265px)] lg:ml-[255px] xl:w-[calc(100vw-250px-360px)] xl:ml-[250px] xl:mr-[350px] ">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
