import { useAppContext } from "../context/appContext";
import { cn } from "../utils/cn";

/* eslint-disable react/prop-types */
export const Cell = ({ node }) => {
  const { id, isStart, isEnd, isWall } = node;
  const { appState } = useAppContext();

  const backgroundColor = isStart
    ? "orange"
    : isEnd
    ? "yellow"
    : isWall
    ? "black"
    : "";

  const cursor = isStart || isEnd ? "grab" : "pointer";
  return (
    <div
      id={`cell-${id}`}
      className={cn(
        "grid place-items-center w-full h-full bg-transparent overflow-hidden"
      )}
    >
      <div
        style={{ backgroundColor, cursor }}
        draggable={(isStart || isEnd) && !appState.isVisualizing}
        id={`cell-child-${id}`}
        className={cn(
          "w-6 h-6 transition-all rounded ease-linear bg-slate-400/75"
        )}
      ></div>
    </div>
  );
};
