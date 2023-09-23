import { useMemo } from "react"
import { useAppContext } from "../context/appContext"
import { useDijkstrasAlgo } from "./algorithms/useDijkstrasAlgo"
import { useDijkstrasAlgoMin } from "./algorithms/useDijkstrasAlgoMin"
import {
  A_STAR,
  A_STAR_MIN,
  CUSTOM_ALGORITHM,
  DIJKSTRAS,
  DIJKSTRAS_MIN,
  GREEDY_BFS,
} from "../constants/algorithms"
import { useAstarAlgoMin } from "./algorithms/useAstarAlgoMin"
import { useAstarAlgo } from "./algorithms/useAstarAlgo"
import { useCustomAlgo } from "./algorithms/useCustomAlgo"

export const useCurrentAlgorithm = () => {
  const { appState } = useAppContext()

  const dijkstras = useDijkstrasAlgo()
  const dijkstrasMin = useDijkstrasAlgoMin()
  const aStar = useAstarAlgo()
  const aStarMin = useAstarAlgoMin()
  const customAlgo = useCustomAlgo()

  let currentAlgorithm = useMemo(() => {
    switch (appState.currentAlgorithm) {
      case DIJKSTRAS:
        return dijkstras

      case DIJKSTRAS_MIN:
        return dijkstrasMin

      case A_STAR:
        return aStar

      case A_STAR_MIN:
        return aStarMin

      case CUSTOM_ALGORITHM:
        return customAlgo

      default:
        return dijkstras
    }
  }, [
    appState.currentAlgorithm,
    dijkstras,
    dijkstrasMin,
    aStar,
    aStarMin,
    customAlgo,
  ])

  return currentAlgorithm
}
