import { PriorityQueue } from "../../classes/MinHeap";

export const useDijkstrasAlgoMin = () => {
  function* dijkstras(graph) {
    let pq = new PriorityQueue((a, b) => a[1] < b[1]);

    let dist = new Array(graph.V);
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, fromNode: graph.start };

    pq.push([graph.start, 0]);
    dist[graph.start] = { distance: 0, fromNode: graph.start };

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

        // If there is shorter path to v through u.
        if (dist[v].distance > dist[u].distance + weight) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight;
          dist[v].fromNode = u;

          pq.push([v, dist[v].distance]);
        }

        if (v === graph.end) {
          return getShortestPath(dist, graph.start, graph.end);
        }
      }
    }
    // if no path between start and end return empty path array and a shortest distance of infinity
    return getShortestPath(dist, graph.start, graph.end);
  }
  return dijkstras;
};

const getShortestPath = (dist, start, end) => {
  const path = [];
  let distance = dist[end].distance;
  let currentNode = end;

  while (currentNode != start) {
    path.push(currentNode);
    currentNode = dist[currentNode].fromNode;
  }
  path.reverse();
  path.pop();
  console.log(path);

  return { distance, path };
};
