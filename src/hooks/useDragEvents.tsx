import { useState, useCallback } from "react"
import { useAppContext } from "../context/appContext"
import { useGraphContext } from "../context/graphContext"
import { getID } from "../helpers/getID"
import { getGraph } from "../helpers/getGraph"

type Drag = {
  dragItem: "start" | "end" | "other" | null
}

export const useDragEvents = () => {
  const { graph, setGraph } = useGraphContext()
  const { appState } = useAppContext()
  const [drag, setDrag] = useState<Drag>({
    dragItem: null,
  })

  const onDrag = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (appState?.isVisualizing) return
      const target = e.target as HTMLDivElement

      if (drag.dragItem === null) {
        const id = getID(target.id)

        if (graph?.nodes[id].isStart) {
          setDrag((prev) => ({
            ...prev,
            dragItem: "start",
          }))
        } else if (graph?.nodes[id].isEnd) {
          setDrag((prev) => ({ ...prev, dragItem: "end" }))
        } else {
          // make wall or weight
          setDrag((prev) => ({ ...prev, dragItem: "other" }))
        }
      }
    },
    [appState?.isVisualizing, drag.dragItem, graph]
  )

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (appState?.isVisualizing) return
      e.preventDefault()
      const target = e.target as HTMLDivElement

      if (drag.dragItem === "other") {
        if (appState.addWeight) {
          const draggedOverID = getID(target.id)
          setGraph((prev) =>
            getGraph({
              ...prev,
              walls: prev.walls.filter((id) => id !== draggedOverID),
              weights: [...prev.weights, draggedOverID],
            })
          )
        } else if (appState.addWall) {
          const draggedOverID = getID(target.id)

          setGraph((prev) =>
            getGraph({
              ...prev,
              walls: [...prev.walls, draggedOverID],
              weights: prev.weights.filter((id) => id !== draggedOverID),
            })
          )
        }
        setDrag((prev) => ({ ...prev, dragItem: null }))
      }
    },
    [appState, drag.dragItem, setGraph]
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (appState.isVisualizing) return
      const target = e.target as HTMLDivElement

      const dropTargetID = getID(target.id)

      if (drag.dragItem === "start") {
        setGraph((prev) => getGraph({ ...prev, start: dropTargetID }))
      }
      if (drag.dragItem === "end") {
        setGraph((prev) => getGraph({ ...prev, end: dropTargetID }))
      }
      setDrag((prev) => ({ ...prev, dragItem: null }))
    },
    [appState, drag.dragItem, setGraph]
  )

  return { onDrag, onDragOver, onDrop }
}
