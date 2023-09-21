import { DIJKSTRAS, DIJKSTRAS_MIN } from "../constants/algorithms";
import { useAppContext } from "../context/appContext";
import { useShortestPath } from "../hooks/useShortestPath";

export const ControlBar = () => {
  const getShortestPath = useShortestPath();
  const { appState, setAppState } = useAppContext();

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
      >
        <option value={DIJKSTRAS}>Dijkstras</option>
        <option value={DIJKSTRAS_MIN}>Dijkstras (Min Heap)</option>
      </select>
      <button disabled={appState.isVisualizing} onClick={getShortestPath}>
        Find Shortest Path
      </button>
    </div>
  );
};
