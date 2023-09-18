import { useGraphContext } from "../context/graphContext";
import { delay, useDijkstrasAlgo } from "../hooks/useDijkstrasAlgo";
import { Grid } from "./Grid";

export const Hero = () => {
  const { graph, setGraph } = useGraphContext();
  const dijkstra = useDijkstrasAlgo();

  const getShortestPath = async () => {
    console.log("dfdf");
    const shortestPathGenerator = dijkstra(graph, 250, 550);

    let updatedGraph;

    let nextYield = shortestPathGenerator.next();
    console.log(nextYield);
    while (!nextYield.done) {
      updatedGraph = nextYield.value;
      setGraph(updatedGraph);

      await delay(1);
      nextYield = shortestPathGenerator.next();
    }
    // console.log(updatedGraph);
    const graphBeforeShortestPath = { ...updatedGraph };
    if (nextYield.done) updatedGraph = nextYield.value;

    const nodes = updatedGraph.nodes.map((node) => {
      return {
        ...node,
        isVisited: graphBeforeShortestPath.nodes[node.id].isVisited,
      };
    });
    updatedGraph = { ...updatedGraph, nodes };
    setGraph(updatedGraph);
  };
  // console.log(graph.nodes);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <button onClick={getShortestPath}>Find Shortest Path</button>
      <Grid />
    </div>
  );
};
