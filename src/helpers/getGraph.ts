import { Graph } from "../classes/Graph";

export const getGraph = (V, start, end, walls) => {
  const graph = new Graph(V, start, end, walls);

  return graph;
};
