// import { useGraphContext } from "../context/graphContext";

export const useDijkstrasAlgo = () => {
  // const { graph, setGraph } = useGraphContext();

  function* dijkstras(graph, start, end) {
    // Prints shortest paths from start to all other vertices

    // Create a priority queue to store vertices that
    // are being preprocessed. This is weird syntax in C++.
    // Refer below link for details of graph syntax
    // https://www.geeksforgeeks.org/implement-min-heap-using-stl/
    let pq = [];

    // Create a vector for distances and initialize all
    // distances as infinite (INF)
    let dist = new Array(graph.V);
    for (let i = 0; i < graph.V; i++)
      dist[i] = { distance: Infinity, fromNode: start };

    // Insert source itself in priority queue and initialize
    // its distance as 0.
    pq.push([0, start]);
    dist[start] = { distance: 0, fromNode: start };

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

        // if shortest distance is not infinity then mark as visited
        const nodes = graph.nodes.map((node) => {
          const isVisited = dist[node.id].distance !== Infinity;

          return { ...node, isVisited };
        });

        yield { ...graph, nodes }; /////////////////////////////////////////////////////////////

        // If there is shorted path to v through u.
        if (dist[v].distance > dist[u].distance + weight) {
          // Updating distance of v
          dist[v].distance = dist[u].distance + weight;
          dist[v].fromNode = u;

          pq.push([dist[v].distance, v]);
          pq.sort((a, b) => {
            if (a[0] == b[0]) return a[1] - b[1];
            return a[0] - b[0];
          });
        }

        if (v === end) {
          const shortestPath = getShortestPath(dist, start, end);
          const nodes = graph.nodes.map((node) => {
            const isShortestPath = shortestPath.path.includes(node.id);

            return { ...node, isShortestPath };
          });
          return { ...graph, nodes };
        }
      }
    }
    // console.log(dist);
    // Print shortest distances stored in dist[]
    // document.write("Vertex Distance from Source");
    // for (let i = 0; i < graph.V; ++i)
    //   console.log(i, "        ", dist[i].distance);
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
  return { distance, path };
};

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
