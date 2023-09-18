/* eslint-disable react/prop-types */

import { useState } from "react";
import { graphContext } from "./context/graphContext";
import { Graph } from "./classes/Graph";
import { Hero } from "./components/Hero";

const getGraph = (V) => {
  const graph = new Graph(V, 250, 550);
  // console.log(graph.nodes);

  return graph;
};

const App = () => {
  const [graph, setGraph] = useState(getGraph(800));

  return (
    <graphContext.Provider value={{ graph, setGraph }}>
      <Hero />
    </graphContext.Provider>
  );
};

export default App;
