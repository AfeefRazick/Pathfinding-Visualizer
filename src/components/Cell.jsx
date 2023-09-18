// import { useGraphContext } from "../context/graphContext";

import { cn } from "../utils/cn";

/* eslint-disable react/prop-types */
export const Cell = ({ node }) => {
  const { id, isShortestPath, isVisited, isStart, isEnd } = node;
  // console.log(isVisited);
  return (
    <div
      className={cn(
        "w-6 h-6 border border-solid border-black",
        isVisited ? "bg-blue-600" : "",
        isShortestPath ? "bg-red-700" : "",
        isStart ? "bg-black" : "",
        isEnd ? "bg-yellow-400" : ""
      )}
    >
      {/* {id} */}
    </div>
  );
};
