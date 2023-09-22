import { PriorityQueue } from "../../classes/MinHeap";
import { getShortestPath } from "../../helpers/getShortestPath";
import { manhattanDist } from "../../utils/manhattanDistance";

export const useAstarAlgoMin = () => {
  function* aStarMin(graph) {
    let pq = new PriorityQueue((a, b) => a[1] < b[1]);

    let dist = new Array(graph.V);
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, heuristic: 0, fromNode: graph.start };

    pq.push([
      graph.start,
      manhattanDist(graph.nodes[graph.start], graph.nodes[graph.end]),
    ]);
    dist[graph.start] = {
      distance: 0,
      heuristic: manhattanDist(
        graph.nodes[graph.start],
        graph.nodes[graph.end]
      ),
      fromNode: graph.start,
    };

    while (pq.size() > 0) {
      let u = pq.peek()[0];
      pq.pop();

      for (let i = 0; i < graph.nodes[u].neighbours.length; i++) {
        let v = graph.nodes[u].neighbours[i].neighbourIndex;
        let weight = graph.nodes[u].neighbours[i].weight;

        // if shortest distance is not infinity then mark as visited
        const nodes = graph.nodes.map((node) => {
          const isVisited = dist[node.id].distance !== Infinity;

          return { ...node, isVisited };
        });

        yield { ...graph, nodes };

        const newPriorityValue =
          dist[u].distance +
          weight +
          manhattanDist(graph.nodes[u], graph.nodes[graph.end]);

        if (dist[v].distance + dist[v].heuristic > newPriorityValue) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight;
          dist[v].fromNode = u;

          pq.push([v, newPriorityValue]);
        }

        if (v === graph.end) {
          return getShortestPath(dist, graph.start, graph.end);
        }
      }
    }
    // if no path between start and end return empty path array and a shortest distance of infinity
    return getShortestPath(dist, graph.start, graph.end);
  }
  return aStarMin;
};
