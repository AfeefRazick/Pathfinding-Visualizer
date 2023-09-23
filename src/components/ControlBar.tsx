import {
  A_STAR,
  A_STAR_MIN,
  CUSTOM_ALGORITHM,
  DIJKSTRAS,
  DIJKSTRAS_MIN,
  GREEDY_BFS,
} from "../constants/algorithms"
import { useAppContext } from "../context/appContext"
import { useShortestPath } from "../hooks/useShortestPath"

export const ControlBar = () => {
  const getShortestPath = useShortestPath()
  const { appState, setAppState } = useAppContext()

  return (
    <div>
      <select
        disabled={appState.isVisualizing}
        value={appState.currentAlgorithm}
        onChange={(e) =>
          setAppState((prev) => ({ ...prev, currentAlgorithm: e.target.value }))
        }
        name="algorithms"
        id="algorithms"
        className="focus:outline-none"
      >
        <option value={DIJKSTRAS}>Dijkstras</option>
        <option value={A_STAR}>A* Star</option>
        <option value={GREEDY_BFS}>Greedy BFS</option>
        <option value={CUSTOM_ALGORITHM}>My Algorithm</option>
        <option value={DIJKSTRAS_MIN}>Dijkstras (Min Heap)</option>
        <option value={A_STAR_MIN}>A* Star (Min Heap)</option>
      </select>
      <button disabled={appState.isVisualizing} onClick={getShortestPath}>
        Find Shortest Path
      </button>
      <button
        disabled={appState.isVisualizing}
        onClick={() => setAppState((prev) => ({ ...prev, addWeight: true }))}
      >
        Add Weight
      </button>
    </div>
  )
}
