// import { useGraphContext } from "../context/graphContext";

import { cn } from "../utils/cn";

/* eslint-disable react/prop-types */
export const Cell = ({ node }) => {
  const { id, isStart, isEnd } = node;

  const backgroundColor = isStart ? "black" : isEnd ? "yellow" : "";
  return (
    <div
      id={`cell-${id}`}
      className={cn("w-6 h-6 border border-solid border-black")}
    >
      <div
        style={{ backgroundColor }}
        draggable={true}
        id={`cell-child-${id}`}
        className={cn("w-full h-full transition-all ease-linear")}
      ></div>
    </div>
  );
};
