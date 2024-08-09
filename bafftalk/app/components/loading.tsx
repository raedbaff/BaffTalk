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

const Loading = ({
  type,
  color,
  height,
  width,
}: {
  type: LoadingType;
  color: string;
  height?: number;
  width?: number;
}) => <ReactLoading type={type} color={color} height={height ? height : 50} width={width ? width : 50} />;

export default Loading;
