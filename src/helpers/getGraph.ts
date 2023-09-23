import { Graph } from "../classes/Graph"

export const getGraph = (V, start, end, walls, weights) => {
  const graph = new Graph(V, start, end, walls, weights)

  return graph
}
