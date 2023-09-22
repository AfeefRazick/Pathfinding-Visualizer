import { getPath } from "../../helpers/getPath";
import { manhattanDist } from "../../utils/manhattanDistance";

export const usebadAstarAlgo = () => {
  function* aStar(graph) {
    let pq = [];
    // Create a vector for distances and initialize all
    // distances as infinite
    let dist = new Array(graph.V);
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, fromNode: graph.start };

    // Insert source itself in priority queue and initialize
    // its distance as 0.
    pq.push([
      manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
      graph.start,
    ]);
    dist[graph.start] = {
      distance: manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
      fromNode: graph.start,
    };

    /* Looping till priority queue becomes empty (or all
        distances are not finalized) */
    while (pq.length > 0) {
      // The first vertex in pair is the minimum distance
      // vertex, extract it from priority queue.
      // vertex label is stored in second of pair (it
      // has to be done graph way to keep the vertices
      // sorted distance (distance must be first item
      // in pair)
      let u = pq[0][1];
      pq.shift();

      // loop through neighbours of current node
      // updating the neighbours new shortestdistance if less than previous shortestdistance
      for (let i = 0; i < graph.nodes[u].neighbours.length; i++) {
        // Get vertex label and weight of current
        // adjacent of u.
        let v = graph.nodes[u].neighbours[i].neighbourIndex;
        let weight = graph.nodes[u].neighbours[i].weight;

        yield graph.nodes[v];

        // If there is shorter path to v through u.
        const newDistance =
          dist[u].distance +
          weight +
          manhattanDist(graph.nodes[u], graph.nodes[graph.end]);
        if (dist[v].distance > newDistance) {
          // Updating distance of v
          dist[v].distance = newDistance;
          dist[v].fromNode = u;

          pq.push([dist[v].distance, v]);
          pq.sort((a, b) => {
            if (a[0] == b[0]) return a[1] - b[1];
            return a[0] - b[0];
          });
        }

        if (v === graph.end) {
          return getPath(dist, graph.start, graph.end);
        }
      }
    }
    // if no path between start and end return empty path array and a shortest distance of infinity
    return getPath(dist, graph.start, graph.end);
  }
  return aStar;
};
