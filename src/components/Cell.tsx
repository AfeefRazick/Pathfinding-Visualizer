/* eslint-disable react/prop-types */
import { COL_COUNT } from "../constants/graphValues"
import { useAppContext } from "../context/appContext"
import { useGraphContext } from "../context/graphContext"
import { cn } from "../utils/cn"
import { BiTargetLock } from "react-icons/bi"
import { GiBowman } from "react-icons/gi"
import weight from "../../public/weight.svg"
import type { Node } from "../classes/Graph"

type CellProps = {
  node: Node
}

export const Cell = ({ node }: CellProps) => {
  const { id, isStart, isEnd, isWall, isWeight } = node
  const { appState } = useAppContext()
  const { graph } = useGraphContext()

  const flipX = (graph.start % COL_COUNT) - (graph.end % COL_COUNT) > 0
  const backgroundColor = isStart || isEnd ? "white" : isWall ? "black" : ""

  const cursor = isStart || isEnd ? "grab" : "pointer"
  return (
    <div
      id={`cell-${id}`}
      draggable={!appState.isVisualizing}
      className={cn(
        "grid h-full w-full place-items-center overflow-hidden bg-transparent"
      )}
    >
      <div
        style={{ backgroundColor, cursor }}
        id={`cell-child-${id}`}
        className={cn(
          "h-6 w-6 overflow-hidden rounded bg-slate-400/75 transition-all ease-linear"
        )}
      >
        {isStart && (
          <GiBowman
            className={cn("h-full w-full", flipX ? "-scale-x-100" : "")}
          />
        )}
        {isEnd && <BiTargetLock className="h-full w-full" />}
        {isWeight && <img src={weight} className="h-full w-full p-0.5" />}
      </div>
    </div>
  )
}
