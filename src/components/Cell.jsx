// import { useGraphContext } from "../context/graphContext";

import { cn } from "../utils/cn";

/* eslint-disable react/prop-types */
export const Cell = ({ node }) => {
  const { id, isStart, isEnd, isWall } = node;

  const backgroundColor = isStart
    ? "orange"
    : isEnd
    ? "yellow"
    : isWall
    ? "black"
    : "";
  return (
    <div
      id={`cell-${id}`}
      className={cn(
        "grid place-items-center w-full h-full bg-transparent overflow-hidden"
      )}
    >
      <div
        style={{ backgroundColor }}
        draggable={true}
        id={`cell-child-${id}`}
        className={cn(
          "w-6 h-6 transition-all rounded ease-linear bg-slate-400/75"
        )}
      ></div>
    </div>
  );
};
