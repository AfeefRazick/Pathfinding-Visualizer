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
  const graph = new Graph(
    V,
    start,
    end,
    walls.filter((id) => id !== 0), //quick fix to get rid of glitch
    weights.filter((id) => id !== 0), // that keeps spawning special nodes at 0
    weight
  )

  return graph
}
