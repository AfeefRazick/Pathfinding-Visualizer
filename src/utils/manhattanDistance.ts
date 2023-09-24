import { Node } from "../classes/Graph"

export function manhattanDist(node: Node, endNode: Node) {
  const d1 = Math.abs(endNode.position.row - node.position.row)
  const d2 = Math.abs(endNode.position.col - node.position.col)

  return d1 + d2
}
