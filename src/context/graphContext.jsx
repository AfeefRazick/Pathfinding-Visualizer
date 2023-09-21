/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { getGraph } from "../helpers/getGraph";
import { VERTEX_COUNT } from "../constants/graphValues";

const graphContext = createContext(null);

export const useGraphContext = () => {
  return useContext(graphContext);
};

export const GraphProvider = ({ children }) => {
  const [graph, setGraph] = useState(
    getGraph(VERTEX_COUNT, 190, 228, [100, 101, 300])
  );

  return (
    <graphContext.Provider value={{ graph, setGraph }}>
      {children}
    </graphContext.Provider>
  );
};
