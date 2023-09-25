import { useCallback } from "react"
import {
  SHORTESTPATH_ANIMATION,
  VISITED_ANIMATION,
} from "../constants/animations"
import { useGraphContext } from "../context/graphContext"
import { delay } from "../utils/delay"
import { useAppContext } from "../context/appContext"
import { useCurrentAlgorithm } from "./useCurrentAlgorithm"
import { resetGraphStyles } from "../helpers/resetGraphStyles"

export const useShortestPath = () => {
  const { graph } = useGraphContext()
  const { appState, setAppState } = useAppContext()
  const currentAlgorithm = useCurrentAlgorithm()

  const getShortestPath = useCallback(async () => {
    setAppState((prev) => ({ ...prev, isVisualizing: true }))

    // remove cell styles before finding shortest path
    resetGraphStyles(graph)

    const shortestPathGenerator = currentAlgorithm(graph)

    // let updatedGraph;
    let nextYield = shortestPathGenerator.next()

    while (!nextYield.done) {
      const node = nextYield.value
      if (!node.isStart && !node.isEnd && !node.isWall) {
        const nodeElement = document.getElementById(`cell-child-${node.id}`)
        if (
          nodeElement &&
          nodeElement.style.backgroundColor !== "rgb(0, 190, 218)"
        ) {
          setTimeout(() => {
            nodeElement.style.backgroundColor = "rgb(0, 190, 218)"
          }, 200)
          nodeElement.classList.add(VISITED_ANIMATION)
        }
      }

      await delay(appState.delayms)
      nextYield = shortestPathGenerator.next()
    }

    const { path } = nextYield.value

    path.forEach((nodeId, index) => {
      const nodeElement = document.getElementById(`cell-child-${nodeId}`)

      if (nodeElement) {
        setTimeout(() => {
          nodeElement.classList.remove(VISITED_ANIMATION)
          nodeElement.classList.add(SHORTESTPATH_ANIMATION)
        }, 100 * index)
        setTimeout(
          () => {
            nodeElement.style.backgroundColor = "#39fc17"
          },
          100 * (index + 1)
        )
      }
    })

    // wait until shortestpath animation finishes to set isVisualizing to false
    setTimeout(() => {
      setAppState((prev) => ({ ...prev, isVisualizing: false }))
    }, path.length * 100)

    if (path.length === 0) {
      // no path message
    }
  }, [currentAlgorithm, graph, appState, setAppState])
  return getShortestPath
}
