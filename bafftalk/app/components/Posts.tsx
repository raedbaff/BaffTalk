"use client";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { PostType } from "@/types";
import Loading from "react-loading";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`
      );
      if (response.status === 404) {
        setPosts([]);
      }
      if (response.ok) {
        const data = await response.json();

        setPosts(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const postss = [
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
    },
  ];
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-265px)] lg:ml-[255px] xl:w-[calc(100vw-250px-360px)] xl:ml-[250px] xl:mr-[350px] ">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading type={"spin"} color="orange" />
        </div>
      ) : (
        posts.map((post) => (
          <div key={post?._id}>
            <Post key={post._id} post={post} loading={loading} />
            <hr className="border-t-1 border-gray-300 my-2 w-full"></hr>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
