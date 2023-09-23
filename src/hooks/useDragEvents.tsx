import { useState, useCallback } from "react"
import { useAppContext } from "../context/appContext"
import { useGraphContext } from "../context/graphContext"
import { getID } from "../helpers/getID"
import { getGraph } from "../helpers/getGraph"

export const useDragEvents = () => {
  const { graph, setGraph } = useGraphContext()
  const { appState } = useAppContext()
  const [drag, setDrag] = useState({
    dragItem: null,
  })

  const onDrag = useCallback(
    (e) => {
      if (appState.isVisualizing) return

      if (drag.dragItem === null) {
        const id = getID(e.target)

        if (graph.nodes[id].isStart) {
          setDrag((prev) => ({
            ...prev,
            dragItem: "start",
          }))
        } else if (graph.nodes[id].isEnd) {
          setDrag((prev) => ({ ...prev, dragItem: "end" }))
        } else {
          // make wall or weight
          setDrag((prev) => ({ ...prev, dragItem: "other" }))
        }
      }
    },
    [appState.isVisualizing, drag.dragItem, graph]
  )

  const onDragOver = useCallback(
    (e) => {
      if (appState.isVisualizing) return
      e.preventDefault()

      if (drag.dragItem === "other") {
        if (appState.addWeight) {
          const draggedOverID = getID(e.target)
          setGraph((prev) =>
            getGraph(prev.V, prev.start, prev.end, prev.walls, [
              ...prev.weights,
              draggedOverID,
            ])
          )
        } else if (appState.addWall) {
          const draggedOverID = getID(e.target)

          setGraph((prev) =>
            getGraph(
              prev.V,
              prev.start,
              prev.end,
              [...prev.walls, draggedOverID],
              prev.weights
            )
          )
        }
        setDrag((prev) => ({ ...prev, dragItem: null }))
      }
    },
    [appState, drag.dragItem, setGraph]
  )

  const onDrop = useCallback(
    (e) => {
      if (appState.isVisualizing) return
      const dropTargetID = getID(e.target)
      // if (dropTargetID === graph.start || dropTargetID === graph.end) {

      //   setGraph((prev) =>
      //     getGraph(prev.V, prev.start, prev.end, prev.walls, prev.weights)
      //   )
      //   return setDrag((prev) => ({
      //     ...prev,
      //     dragItem: null,
      //   }))
      // }

      if (drag.dragItem === "start") {
        setGraph((prev) =>
          getGraph(prev.V, dropTargetID, prev.end, prev.walls, prev.weights)
        )
      }
      if (drag.dragItem === "end") {
        setGraph((prev) =>
          getGraph(prev.V, prev.start, dropTargetID, prev.walls, prev.weights)
        )
      }
      setDrag((prev) => ({ ...prev, dragItem: null }))
    },
    [appState, drag.dragItem, setGraph]
  )

  return { onDrag, onDragOver, onDrop }
}
