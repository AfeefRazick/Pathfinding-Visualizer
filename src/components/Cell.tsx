import { COL_COUNT } from "../constants/graphValues"
import { useAppContext } from "../context/appContext"
import { useGraphContext } from "../context/graphContext"
import { cn } from "../utils/cn"
import { BiTargetLock } from "react-icons/bi"
import { GiBowman } from "react-icons/gi"
import { FaBucket } from "react-icons/fa6"

/* eslint-disable react/prop-types */
export const Cell = ({ node }) => {
  const { id, isStart, isEnd, isWall, isWeight } = node
  const { appState } = useAppContext()
  const { graph } = useGraphContext()

  const flipX = (graph.start % COL_COUNT) - (graph.end % COL_COUNT) > 0
  const backgroundColor = isStart || isEnd ? "white" : isWall ? "black" : ""

  const cursor = isStart || isEnd ? "grab" : "pointer"
  return (
    <div
      id={`cell-${id}`}
      className={cn(
        "grid h-full w-full place-items-center overflow-hidden bg-transparent"
      )}
    >
      <div
        style={{ backgroundColor, cursor }}
        draggable={!appState.isVisualizing} //put in parent
        id={`cell-child-${id}`}
        className={cn(
          "h-6 w-6 rounded bg-slate-400/75 transition-all ease-linear"
        )}
      >
        {isStart && (
          <GiBowman
            className={cn("h-full w-full", flipX ? "-scale-x-100" : "")}
          />
        )}
        {isEnd && <BiTargetLock className="h-full w-full" />}
        {isWeight && <FaBucket className="h-full w-full" />}
      </div>
    </div>
  )
}
