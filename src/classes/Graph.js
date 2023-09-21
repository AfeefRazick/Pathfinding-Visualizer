import { COL_COUNT, ROW_COUNT } from "../constants/graphValues";

// problem is that i am setting isstart when graph is made...need to do on change as well
export class Graph {
  constructor(V, start, end, walls) {
    // No. of vertices
    this.V = V;
    this.start = start;
    this.end = end;
    this.walls = walls;
    // In a weighted graph, we need to store vertex
    // and weight pair for every edge
    this.nodes = new Array(V);

    // for (let i = 0; i < V; i++) {
    //   // this.nodes[i] = new Array();
    //   this.nodes[i] = { id: i, neighbours: [] };
    // }

    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        let i = row * COL_COUNT + col;

        let neighbours = [];

        // if node is wall dont add neighbours
        if (!this.walls.includes(i)) {
          if (row !== 0)
            neighbours.push({ neighbourIndex: i - COL_COUNT, weight: 1 }); //add top neighbour
          if (col !== COL_COUNT - 1)
            neighbours.push({ neighbourIndex: i + 1, weight: 1 }); //add right neighbour
          if (row !== ROW_COUNT - 1)
            neighbours.push({ neighbourIndex: i + COL_COUNT, weight: 1 }); //add bottom neighbour
          if (col !== 0) neighbours.push({ neighbourIndex: i - 1, weight: 1 }); //add left neighbour
        }
        // if node has a wall neighbour remove the wall neighbour
        neighbours = neighbours.filter(
          (neighbour) => !this.walls.includes(neighbour.neighbourIndex)
        );

        this.nodes[i] = {
          id: i,
          neighbours,
          isStart: start === i,
          isEnd: end === i,
          isWall: neighbours.length === 0,
        };
      }
    }
  }

  addEdge(u, v, w) {
    this.nodes[u].neighbours.push({ neighbourIndex: v, weight: w });
    this.nodes[v].neighbours.push({ neighbourIndex: u, weight: w });
  }
}
