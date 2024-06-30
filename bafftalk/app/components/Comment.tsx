import Image from "next/image";
import React from "react";

const Comment = () => {
  return (
    <div className="flex flex-col gap-1 my-2">
      <div className="flex items-center gap-1  py-2">
        <Image
          className="rounded-full"
          src={"/images/peter.png"}
          alt="peter"
          width={40}
          height={40}
        />
        <span>Peter griffin</span>
        <span className="text-gray-400 text-sm">12 Hours Ago</span>
      </div>
      <div className="px-7 py-2">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
          enim officiis reiciendis accusamus a ratione error, facere commodi
          molestias rerum!
        </p>
        <div className="flex items-center gap-3">
          <div>Like</div> <div>Comment</div>
          <div>Award</div> <div>Share</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
