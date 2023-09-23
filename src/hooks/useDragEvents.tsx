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
          // make wall
          setDrag((prev) => ({ ...prev, dragItem: "wall" }))
        }
      }
    },
    [appState.isVisualizing, drag.dragItem, graph]
  )

  const onDragOver = useCallback(
    (e) => {
      if (appState.isVisualizing) return
      e.preventDefault()

      if (appState.addWeight) {
        console.log("dfd")
        const draggedOverID = getID(e.target)
        setGraph((prev) =>
          getGraph(prev.V, prev.start, prev.end, prev.walls, [
            ...prev.weights,
            draggedOverID,
          ])
        )
      } else if (drag.dragItem === "wall") {
        const draggedOverID = getID(e.target)

        setGraph((prev) =>
          getGraph(prev.V, prev.start, prev.end, [...prev.walls, draggedOverID])
        )
        setDrag((prev) => ({ ...prev, dragItem: null }))
      }
    },
    [appState.isVisualizing, drag.dragItem, setGraph]
  )

  const onDrop = useCallback(
    (e) => {
      if (appState.isVisualizing) return
      const dropTargetID = getID(e.target)

      if (dropTargetID === graph.start || dropTargetID === graph.end) {
        return setDrag((prev) => ({
          ...prev,
          dragItem: null,
        }))
      }

      if (drag.dragItem === "start") {
        setGraph((prev) => getGraph(prev.V, dropTargetID, prev.end, prev.walls))
      }
      if (drag.dragItem === "end") {
        setGraph((prev) =>
          getGraph(prev.V, prev.start, dropTargetID, prev.walls)
        )
      }
      setDrag((prev) => ({ ...prev, dragItem: null }))
    },
    [appState.isVisualizing, drag.dragItem, graph, setGraph]
  )

  return { onDrag, onDragOver, onDrop }
}
