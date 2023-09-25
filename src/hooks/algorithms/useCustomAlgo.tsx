import { Graph } from "../../classes/Graph"
import { getPath } from "../../helpers/getPath"
import { manhattanDist } from "../../utils/manhattanDistance"

export const useCustomAlgo = () => {
  function* customAlgo(graph: Graph) {
    const pq: number[][] = []

    const dist = new Array(graph.V)
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, fromNode: graph.start }

    pq.push([
      manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
      graph.start,
    ])
    dist[graph.start] = {
      distance: manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
      fromNode: graph.start,
    }

    while (pq.length > 0) {
      const u = pq[0][1]
      pq.shift()

      // loop through neighbours of current node
      // updating the neighbours new shortestdistance if less than previous shortestdistance
      for (let i = 0; i < graph.nodes[u].neighbours.length; i++) {
        // Get vertex label and weight of current
        // adjacent of u.
        const v = graph.nodes[u].neighbours[i].neighbourIndex
        const weight = graph.nodes[u].neighbours[i].weight

        yield graph.nodes[v]

        // If there is shorter path to v through u.
        const newDistance =
          dist[u].distance +
          weight +
          manhattanDist(graph.nodes[u], graph.nodes[graph.end])
        if (dist[v].distance > newDistance) {
          // Updating distance of v
          dist[v].distance = newDistance
          dist[v].fromNode = u

          pq.push([dist[v].distance, v])
          pq.sort((a, b) => {
            if (a[0] == b[0]) return a[1] - b[1]
            return a[0] - b[0]
          })
        }

        if (v === graph.end) {
          return getPath(dist, graph.start, graph.end)
        }
      }
    }
    // if no path between start and end return empty path array and a shortest distance of infinity
    return getPath(dist, graph.start, graph.end)
  }
  return customAlgo
}
