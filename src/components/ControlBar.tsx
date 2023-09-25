import {
  A_STAR,
  A_STAR_MIN,
  CUSTOM_ALGORITHM,
  DIJKSTRAS,
  DIJKSTRAS_MIN,
} from "../constants/algorithms"
import { useAppContext } from "../context/appContext"
import { useGraphContext } from "../context/graphContext"
import { getGraph } from "../helpers/getGraph"
import { resetGraphStyles } from "../helpers/resetGraphStyles"
import { Button } from "./Button"
import { Info } from "./Info"
import { Sliders } from "./Sliders"

export const ControlBar = () => {
  const { appState, setAppState } = useAppContext()
  const { graph, setGraph } = useGraphContext()

  return (
    <div className="mb-4 flex h-auto w-full  items-center justify-center bg-gray-100 pb-4 pt-2 shadow-md md:h-32 md:pt-5 ">
      <div className="flex h-full flex-col items-center justify-center gap-4 md:flex-row">
        <div className="mr-4 flex h-full flex-col items-center">
          <h2 className="pb-2 text-lg font-semibold">Algorithms</h2>
          <select
            disabled={appState.isVisualizing}
            value={appState.currentAlgorithm}
            onChange={(e) =>
              setAppState((prev) => ({
                ...prev,
                currentAlgorithm: e.target.value,
              }))
            }
            name="algorithms"
            id="algorithms"
            className="rounded-md px-2 py-1 focus:outline-none"
          >
            <option value={DIJKSTRAS}>Dijkstras</option>
            <option value={A_STAR}>A* Star</option>
            <option value={CUSTOM_ALGORITHM}>My Algorithm</option>
            <option value={DIJKSTRAS_MIN}>Dijkstras (Min Heap)</option>
            <option value={A_STAR_MIN}>A* Star (Min Heap)</option>
          </select>
        </div>

        <Sliders />

        <div className="flex w-full flex-row justify-between gap-3 md:w-auto md:flex-col">
          <Button
            isActive={appState.addWeight}
            onClick={() =>
              setAppState((prev) => ({
                ...prev,
                addWeight: true,
                addWall: false,
              }))
            }
          >
            Add Weight
          </Button>
          <Button
            isActive={appState.addWall}
            onClick={() =>
              setAppState((prev) => ({
                ...prev,
                addWeight: false,
                addWall: true,
              }))
            }
          >
            Add Wall
          </Button>
        </div>
        <div className="flex w-full flex-row justify-between gap-3 md:w-auto md:flex-col">
          <Button
            onClick={() =>
              setGraph((prev) => getGraph({ ...prev, walls: [], weights: [] }))
            }
          >
            Clear Board
          </Button>
          <Button onClick={() => resetGraphStyles(graph)}>Clear Path</Button>
        </div>
        <Info />
      </div>
    </div>
  )
}
