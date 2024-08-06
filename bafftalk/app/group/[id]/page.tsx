"use client";
import GroupBody from "@/app/components/GroupBody";
import GroupHeader from "@/app/components/GroupHeader";
import { Group, PostType } from "@/types";
import React, { useEffect, useState } from "react";

const GroupDetails = ({ params }: { params: { id: string } }) => {
  const [group, setgroup] = useState<Group>();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchGroupAndPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/groupAndPosts/${params.id}`
      );
      if (response.ok) {
        setLoading(false);
        const data = await response.json(); 
        setgroup(data.group);
        setPosts(data.posts);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchGroupAndPosts();
  }, [params.id]);
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
      <GroupHeader group={group} setgroup={setgroup} />
      <GroupBody group={group} posts={posts} loading={loading} />
    </div>
  );
};

export default GroupDetails;
