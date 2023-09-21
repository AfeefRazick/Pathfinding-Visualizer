/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { Graph } from "../classes/Graph";

const graphContext = createContext(null);

export const useGraphContext = () => {
  return useContext(graphContext);
};

export const GraphProvider = ({ children }) => {
  const [graph, setGraph] = useState(getGraph(800, 340, 250));

  return (
    <graphContext.Provider value={{ graph, setGraph }}>
      {children}
    </graphContext.Provider>
  );
};

const getGraph = (V, start, end) => {
  const graph = new Graph(V, start, end);

  return graph;
};
