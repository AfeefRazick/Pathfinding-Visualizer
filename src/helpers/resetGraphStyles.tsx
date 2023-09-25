import { Graph } from "../classes/Graph"
import {
  SHORTESTPATH_ANIMATION,
  VISITED_ANIMATION,
} from "../constants/animations"

export const resetGraphStyles = (graph: Graph) => {
  graph.nodes.forEach((node) => {
    if (!(node.isStart || node.isEnd || node.isWall)) {
      const nodeElement = document.getElementById(`cell-child-${node.id}`)

      if (nodeElement) {
        nodeElement.classList.remove(SHORTESTPATH_ANIMATION)
        nodeElement.classList.remove(VISITED_ANIMATION)
        nodeElement.style.backgroundColor = "rgb(168, 183, 204)"
      }
    }
  })
}
