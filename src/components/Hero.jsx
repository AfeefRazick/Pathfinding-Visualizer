import {
  SHORTESTPATH_ANIMATION,
  VISITED_ANIMATION,
} from "../constants/animations";
import { useGraphContext } from "../context/graphContext";
import { useDijkstrasAlgo } from "../hooks/useDijkstrasAlgo";
import { delay, useDijkstrasAlgoMin } from "../hooks/useDijkstrasAlgoMin";
import { Grid } from "./Grid";

export const Hero = () => {
  const { graph } = useGraphContext();
  const dijkstra = useDijkstrasAlgo();

  const getShortestPath = async () => {
    // remove cell styles before finding shortest path
    graph.nodes.forEach((node) => {
      if (!node.isStart && !node.isEnd) {
        const nodeElement = document.getElementById(`cell-child-${node.id}`);
        nodeElement.classList.remove(SHORTESTPATH_ANIMATION);
        nodeElement.classList.remove(VISITED_ANIMATION);

        nodeElement.style.backgroundColor = "#ffffff";
      }
    });

    const shortestPathGenerator = dijkstra(graph);

    let updatedGraph;

    let nextYield = shortestPathGenerator.next();

    while (!nextYield.done) {
      updatedGraph = nextYield.value;

      updatedGraph.nodes.forEach((node) => {
        if (node.isVisited && !node.isStart && !node.isEnd) {
          const nodeElement = document.getElementById(`cell-child-${node.id}`);
          if (nodeElement.style.backgroundColor !== "rgb(0, 190, 218)") {
            setTimeout(() => {
              nodeElement.style.backgroundColor = "#00beda";
            }, 200);
            nodeElement.classList.add(VISITED_ANIMATION);
          }
        }
      });

      await delay(1);
      nextYield = shortestPathGenerator.next();
    }

    const { path } = nextYield.value;

    path.forEach((nodeId, index) => {
      const nodeElement = document.getElementById(`cell-child-${nodeId}`);

      setTimeout(() => {
        nodeElement.classList.remove(VISITED_ANIMATION);
        nodeElement.classList.add(SHORTESTPATH_ANIMATION);
      }, 100 * index);
      setTimeout(
        () => {
          nodeElement.style.backgroundColor = "#39fc17";
        },
        100 * (index + 1)
      );
    });

    // if (nextYield.done) updatedGraph = nextYield.value;

    // let shortestDistance = 0;
    // updatedGraph.nodes.forEach((node) => {
    //   if (node.isShortestPath && !node.isStart && !node.isEnd) {
    //     const nodeElement = document.getElementById(`cell-child-${node.id}`);

    //     setTimeout(() => {
    //       nodeElement.classList.add(SHORTESTPATH_ANIMATION);
    //     }, 100 * shortestDistance);
    //     setTimeout(
    //       () => {
    //         nodeElement.style.backgroundColor = "#39fc17";
    //       },
    //       100 * (shortestDistance + 1)
    //     );

    //     shortestDistance++;
    //   }
    // });

    // const nodes = updatedGraph.nodes.map((node) => {
    //   return {
    //     ...node,
    //     isVisited: graphBeforeShortestPath.nodes[node.id].isVisited,
    //   };
    // });
    // updatedGraph = { ...updatedGraph, nodes };

    // setGraph(updatedGraph);
  };
  console.log(graph.nodes);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <button onClick={getShortestPath}>Find Shortest Path</button>
      <Grid />
    </div>
  );
};
