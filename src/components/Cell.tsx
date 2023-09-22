import { COL_COUNT } from "../constants/graphValues";
import { useAppContext } from "../context/appContext";
import { useGraphContext } from "../context/graphContext";
import { cn } from "../utils/cn";
import { BiTargetLock } from "react-icons/bi";
import { GiBowman } from "react-icons/gi";

/* eslint-disable react/prop-types */
export const Cell = ({ node }) => {
  const { id, isStart, isEnd, isWall } = node;
  const { appState } = useAppContext();
  // const { graph } = useGraphContext();

  // const flipX = (graph.start % COL_COUNT) - (graph.end % COL_COUNT) > 0;
  const backgroundColor = isStart || isEnd ? "white" : isWall ? "black" : "";

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
      >
        {isStart && (
          <GiBowman
            className={cn("w-full h-full", true ? "-scale-x-100" : "")}
          />
        )}
        {isEnd && <BiTargetLock className="w-full h-full" />}
      </div>
    </div>
  );
};
