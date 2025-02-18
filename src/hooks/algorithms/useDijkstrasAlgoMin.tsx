import { Graph } from "../../classes/Graph"
import { PriorityQueue } from "../../classes/MinHeap"
import { getPath } from "../../helpers/getPath"

export const useDijkstrasAlgoMin = () => {
  function* dijkstras(graph: Graph) {
    const pq = new PriorityQueue((a, b) => a[1] < b[1])

    const dist = new Array(graph.V)
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, fromNode: graph.start }

    pq.push([graph.start, 0])
    dist[graph.start] = { distance: 0, fromNode: graph.start }

    while (pq.size() > 0) {
      const u = pq.peek()[0]
      pq.pop()

      for (let i = 0; i < graph.nodes[u].neighbours.length; i++) {
        const v = graph.nodes[u].neighbours[i].neighbourIndex
        const weight = graph.nodes[u].neighbours[i].weight

        yield graph.nodes[v]

        // If there is shorter path to v through u.
        if (dist[v].distance > dist[u].distance + weight) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight
          dist[v].fromNode = u

          pq.push([v, dist[v].distance])
        }

        if (v === graph.end) {
          return getPath(dist, graph.start, graph.end)
        }
      }
    }
    // if no path between start and end return empty path array and a shortest distance of infinity
    return getPath(dist, graph.start, graph.end)
  }
  return dijkstras
}
