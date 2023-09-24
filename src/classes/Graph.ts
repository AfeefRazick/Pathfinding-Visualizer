import { COL_COUNT, ROW_COUNT } from "../constants/graphValues"

export type Node = {
  id: number
  position: { row: number; col: number }
  neighbours: Neighbour[]
  isStart: boolean
  isEnd: boolean
  isWall: boolean
  isWeight: boolean
}

export type Neighbour = {
  neighbourIndex: number
  weight: number
}

export class Graph {
  V: number
  start: number
  end: number
  walls: number[]
  weights: number[]
  nodes: Node[]

  constructor(
    V: number,
    start: number,
    end: number,
    walls: number[] = [],
    weights: number[] = []
  ) {
    // No. of vertices
    this.V = V
    this.start = start
    this.end = end
    // start/node cannot be a wall, so remove from walls if contains start/end
    // next condition removes duplicates
    this.walls = walls.filter(
      (id, index) =>
        !(id === start || id === end) && walls.indexOf(id) === index
    )
    this.weights = weights.filter(
      (id, index) =>
        !(id === start || id === end) && weights.indexOf(id) === index
    )

    this.nodes = new Array(V)

    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        const i = row * COL_COUNT + col

        let neighbours = []
        // console.log(this.weights.includes(i - COL_COUNT))
        // if node is wall dont add neighbours
        if (!this.walls.includes(i)) {
          if (row !== 0)
            neighbours.push({
              neighbourIndex: i - COL_COUNT,
              weight: this.weights.includes(i - COL_COUNT) ? 5 : 1,
            }) //add top neighbour
          if (col !== COL_COUNT - 1)
            neighbours.push({
              neighbourIndex: i + 1,
              weight: this.weights.includes(i - COL_COUNT) ? 5 : 1,
            }) //add right neighbour
          if (row !== ROW_COUNT - 1)
            neighbours.push({
              neighbourIndex: i + COL_COUNT,
              weight: this.weights.includes(i - COL_COUNT) ? 5 : 1,
            }) //add bottom neighbour
          if (col !== 0)
            neighbours.push({
              neighbourIndex: i - 1,
              weight: this.weights.includes(i - COL_COUNT) ? 5 : 1,
            }) //add left neighbour
        }

        // if node has a wall neighbour remove the wall neighbour
        neighbours = neighbours.filter(
          (neighbour) => !this.walls.includes(neighbour.neighbourIndex)
        )

        this.nodes[i] = {
          id: i,
          position: { row, col },
          neighbours,
          isStart: start === i,
          isEnd: end === i,
          isWall: this.walls.includes(i),
          isWeight: this.weights.includes(i),
        }
      }
    }
  }

  addEdge(u: number, v: number, w: number) {
    this.nodes[u].neighbours.push({ neighbourIndex: v, weight: w })
    this.nodes[v].neighbours.push({ neighbourIndex: u, weight: w })
  }
}
