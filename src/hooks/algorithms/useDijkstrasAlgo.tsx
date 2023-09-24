import { Graph } from "../../classes/Graph"
import { getPath } from "../../helpers/getPath"

export const useDijkstrasAlgo = () => {
  function* dijkstras(graph: Graph) {
    const pq: number[][] = []

    // Create a vector for distances and initialize all
    // distances as infinite
    const dist = new Array(graph.V)
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, fromNode: graph.start }

    // Insert source itself in priority queue and initialize
    // its distance as 0.
    pq.push([0, graph.start])
    dist[graph.start] = { distance: 0, fromNode: graph.start }

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

        // if shortest distance is not infinity then mark as visited
        // const nodes = graph.nodes.map((node) => {
        //   const isVisited = dist[node.id].distance !== Infinity;

        //   return { ...node, isVisited };
        // });

        // yield { ...graph, nodes };
        yield graph.nodes[v]

        // If there is shorter path to v through u.
        if (dist[v].distance > dist[u].distance + weight) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight
          dist[v].fromNode = u

          pq.push([dist[v].distance, v])
          pq.sort((a, b) => {
            if (a[0] == b[0]) return a[1] - b[1]
            return a[0] - b[0]
          })
        }
        // should really be outside for loop checking for u instead of v
        // but doesnt matter in grid implementation and is not visually appealing
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
