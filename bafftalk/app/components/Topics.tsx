import React from "react";

const Topics = ({ chooseTopic }: { chooseTopic: boolean }) => {
  return (
    chooseTopic && (
      <div className=" mt-2 w-[300px] shadow-lg z-50 border-black flex flex-col rounded-[10px]">
        <div className="p-4">
          <strong>Topics</strong>
          <div>topic 1</div>
          <div>topic 1</div>
          <div>topic 1</div>
          <div>topic 4</div>
        </div>
      </div>
    )
  );
};

export default Topics;
