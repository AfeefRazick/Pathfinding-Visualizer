import { Graph } from "../../classes/Graph"
import { PriorityQueue } from "../../classes/MinHeap"
import { getPath } from "../../helpers/getPath"
import { manhattanDist } from "../../utils/manhattanDistance"

export const useAstarAlgoMin = () => {
  function* aStarMin(graph: Graph) {
    const pq = new PriorityQueue((a, b) => a[1] < b[1])

    const dist = new Array(graph.V)
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, heuristic: null, fromNode: graph.start }

    pq.push([
      graph.start,
      manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
    ])
    dist[graph.start] = {
      distance: 0,
      heuristic: manhattanDist(
        graph.nodes[graph.start],
        graph.nodes[graph.end]
      ),
      fromNode: graph.start,
    }

    while (pq.size() > 0) {
      const u = pq.peek()[0]
      pq.pop()

      for (let i = 0; i < graph.nodes[u].neighbours.length; i++) {
        const v = graph.nodes[u].neighbours[i].neighbourIndex
        const weight = graph.nodes[u].neighbours[i].weight

        if (!dist[v].heuristic) {
          dist[v].heuristic = manhattanDist(
            graph.nodes[v],
            graph.nodes[graph.end]
          )
        }
        yield graph.nodes[v]

        const newPriorityValue = dist[u].distance + weight + dist[v].heuristic

        if (dist[v].distance + dist[v].heuristic > newPriorityValue) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight
          dist[v].fromNode = u

          pq.push([v, newPriorityValue])
        }

        if (v === graph.end) {
          return getPath(dist, graph.start, graph.end)
        }
      }
    }
    // if no path between start and end return empty path array and a shortest distance of infinity
    return getPath(dist, graph.start, graph.end)
  }
  return aStarMin
}
