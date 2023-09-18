import { createContext, useContext } from "react";

export const graphContext = createContext(null);

export const useGraphContext = () => {
  return useContext(graphContext);
};
