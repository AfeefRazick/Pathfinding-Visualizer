import { Graph } from "../classes/Graph"

type GraphParams = {
  V: number
  start: number
  end: number
  walls: number[]
  weights: number[]
  weight: number
}
export const getGraph = ({
  V,
  start,
  end,
  walls,
  weights,
  weight,
}: GraphParams) => {
  const graph = new Graph(V, start, end, walls, weights, weight)

  return graph
}
