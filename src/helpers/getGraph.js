import { Graph } from "../classes/Graph";

export const getGraph = (V, start, end) => {
  const graph = new Graph(V, start, end);

  return graph;
};
