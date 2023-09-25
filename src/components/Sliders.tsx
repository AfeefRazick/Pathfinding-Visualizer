import { useAppContext } from "../context/appContext"
import { useGraphContext } from "../context/graphContext"
import { getGraph } from "../helpers/getGraph"

export const Sliders = () => {
  const { appState, setAppState } = useAppContext()
  const { setGraph } = useGraphContext()

  return (
    <div className="mx-2 flex w-full flex-row items-center justify-around gap-3 font-medium md:w-auto md:flex-col md:justify-center">
      <div className="flex flex-col">
        <p className="text-center ">Weight</p>
        <input
          disabled={appState.isVisualizing}
          type="range"
          className="slider"
          value={appState.weight}
          min={1}
          max={20}
          onChange={(e) => {
            setGraph((prev) =>
              getGraph({
                ...prev,
                weight: Number(e.target.value),
              })
            )
            setAppState((prev) => ({
              ...prev,
              weight: Number(e.target.value),
            }))
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-center">Delay</p>
        <input
          disabled={appState.isVisualizing}
          type="range"
          className="slider"
          value={appState.delayms}
          min={1}
          max={100}
          onChange={(e) =>
            setAppState((prev) => ({
              ...prev,
              delayms: Number(e.target.value),
            }))
          }
        />
      </div>
    </div>
  )
}
