import { useMemo } from "react";
import { useAppContext } from "../context/appContext";
import { useDijkstrasAlgo } from "./algorithms/useDijkstrasAlgo";
import { useDijkstrasAlgoMin } from "./algorithms/useDijkstrasAlgoMin";
import { DIJKSTRAS, DIJKSTRAS_MIN } from "../constants/algorithms";

export const useCurrentAlgorithm = () => {
  const { appState } = useAppContext();

  const dijkstras = useDijkstrasAlgo();
  const dijkstrasMin = useDijkstrasAlgoMin();

  let currentAlgorithm = useMemo(() => {
    switch (appState.currentAlgorithm) {
      case DIJKSTRAS:
        return dijkstras;

      case DIJKSTRAS_MIN:
        return dijkstrasMin;

      default:
        return dijkstras;
    }
  }, [appState.currentAlgorithm, dijkstras, dijkstrasMin]);

  return currentAlgorithm;
};
