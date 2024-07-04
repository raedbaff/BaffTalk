import React from "react";
import ReactLoading from "react-loading";

type LoadingType =
  | "blank"
  | "balls"
  | "bars"
  | "bubbles"
  | "cubes"
  | "cylon"
  | "spin"
  | "spinningBubbles"
  | "spokes";

const Loading = ({ type, color }: { type: LoadingType; color: string }) => (
  <ReactLoading type={type} color={color} height={50} width={50} />
);

export default Loading;
