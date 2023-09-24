import { Graph } from "../classes/Graph"

type GraphParams = {
  V: number
  start: number
  end: number
  walls: number[]
  weights: number[]
}
export const getGraph = ({ V, start, end, walls, weights }: GraphParams) => {
  const graph = new Graph(V, start, end, walls, weights)

  return graph
}
