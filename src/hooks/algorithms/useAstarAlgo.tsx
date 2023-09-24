import { Graph } from "../../classes/Graph"
import { getPath } from "../../helpers/getPath"
import { manhattanDist } from "../../utils/manhattanDistance"

export const useAstarAlgo = () => {
  function* aStar(graph: Graph) {
    const pq: number[][] = []
    // Create a vector for distances and initialize all
    // distances as infinite
    const dist = new Array(graph.V)
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, heuristic: null, fromNode: graph.start }

    // Insert source itself in priority queue and initialize
    // its weight(distance+heuristic) as 0.
    pq.push([
      manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
      graph.start,
    ])
    dist[graph.start] = {
      distance: 0,
      heuristic: manhattanDist(
        graph.nodes[graph.start],
        graph.nodes[graph.end]
      ),
      fromNode: graph.start,
    }

    /* Looping till priority queue becomes empty (or all
        distances are not finalized) */
    while (pq.length > 0) {
      // The first vertex in pair is the minimum distance
      // vertex, extract it from priority queue.
      // vertex label is stored in second of pair (it
      // has to be done graph way to keep the vertices
      // sorted distance (distance must be first item
      // in pair)
      const u = pq[0][1]
      pq.shift()

      // loop through neighbours of current node
      // updating the neighbours new shortestdistance if less than previous shortestdistance
      for (let i = 0; i < graph.nodes[u].neighbours.length; i++) {
        // Get vertex label and weight of current
        // adjacent of u.
        const v = graph.nodes[u].neighbours[i].neighbourIndex
        const weight = graph.nodes[u].neighbours[i].weight

        if (!dist[v].heuristic) {
          dist[v].heuristic = manhattanDist(
            graph.nodes[v],
            graph.nodes[graph.end]
          )
        }
        yield graph.nodes[v]

        // If there is shorter path to v through u.
        const newPriorityValue = dist[u].distance + weight + dist[v].heuristic

        if (dist[v].distance + dist[v].heuristic > newPriorityValue) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight
          dist[v].fromNode = u

          pq.push([newPriorityValue, v])
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
  return aStar
}
