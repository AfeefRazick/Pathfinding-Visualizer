// problem is that i am setting isstart when graph is made...need to do on change as well
export class Graph {
  constructor(V, start, end) {
    // No. of vertices
    this.V = V;
    this.start = start;
    this.end = end;
    // In a weighted graph, we need to store vertex
    // and weight pair for every edge
    this.nodes = new Array(V);

    // for (let i = 0; i < V; i++) {
    //   // this.nodes[i] = new Array();
    //   this.nodes[i] = { id: i, neighbours: [] };
    // }

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 40; col++) {
        let i = row * 40 + col;

        const neighbours = [];

        if (row !== 0) neighbours.push({ neighbourIndex: i - 40, weight: 1 }); //add top neighbour
        if (col !== 39) neighbours.push({ neighbourIndex: i + 1, weight: 1 }); //add right neighbour
        if (row !== 19) neighbours.push({ neighbourIndex: i + 40, weight: 1 }); //add bottom neighbour
        if (col !== 0) neighbours.push({ neighbourIndex: i - 1, weight: 1 }); //add left neighbour

        this.nodes[i] = {
          id: i,
          neighbours,
          isStart: start === i,
          isEnd: end === i,
        };
      }
    }
  }

  addEdge(u, v, w) {
    this.nodes[u].neighbours.push({ neighbourIndex: v, weight: w });
    this.nodes[v].neighbours.push({ neighbourIndex: u, weight: w });
  }

  // // Prints shortest paths from start to all other vertices
  // shortestPath(start, end) {
  //   // Create a priority queue to store vertices that
  //   // are being preprocessed. This is weird syntax in C++.
  //   // Refer below link for details of this syntax
  //   // https://www.geeksforgeeks.org/implement-min-heap-using-stl/
  //   let pq = [];

  //   // Create a vector for distances and initialize all
  //   // distances as infinite (INF)
  //   let dist = new Array(this.V);
  //   for (let i = 0; i < this.V; i++)
  //     dist[i] = { distance: Infinity, fromNode: start };

  //   // Insert source itself in priority queue and initialize
  //   // its distance as 0.
  //   pq.push([0, start]);
  //   dist[start] = { distance: 0, fromNode: start };

  //   /* Looping till priority queue becomes empty (or all
  //     distances are not finalized) */
  //   while (pq.length > 0) {
  //     // The first vertex in pair is the minimum distance
  //     // vertex, extract it from priority queue.
  //     // vertex label is stored in second of pair (it
  //     // has to be done this way to keep the vertices
  //     // sorted distance (distance must be first item
  //     // in pair)
  //     let u = pq[0][1];
  //     pq.shift();

  //     // 'i' is used to get all adjacent vertices of a
  //     // vertex
  //     for (let i = 0; i < this.nodes[u].neighbours.length; i++) {
  //       // Get vertex label and weight of current
  //       // adjacent of u.
  //       let v = this.nodes[u].neighbours[i].neighbourIndex;
  //       let weight = this.nodes[u].neighbours[i].weight;

  //       // If there is shorted path to v through u.
  //       if (dist[v].distance > dist[u].distance + weight) {
  //         // Updating distance of v
  //         dist[v].distance = dist[u].distance + weight;
  //         dist[v].fromNode = u;

  //         pq.push([dist[v].distance, v]);
  //         pq.sort((a, b) => {
  //           if (a[0] == b[0]) return a[1] - b[1];
  //           return a[0] - b[0];
  //         });
  //       }
  //     }
  //   }
  //   console.log(dist);
  //   // Print shortest distances stored in dist[]
  //   // document.write("Vertex Distance from Source");
  //   for (let i = 0; i < this.V; ++i)
  //     console.log(i, "        ", dist[i].distance);
  // }
}

// Driver's code
// create the graph given in above figure
