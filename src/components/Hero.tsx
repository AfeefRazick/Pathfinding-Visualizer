import { useShortestPath } from "../hooks/useShortestPath"
import { Button } from "./Button"
import { ControlBar } from "./ControlBar"
import { Grid } from "./Grid"
import { FaPlay } from "react-icons/fa6"

export const Hero = () => {
  const getShortestPath = useShortestPath()
  return (
    <div className="flex h-screen w-screen flex-col items-center gap-2 md:gap-4">
      <ControlBar />
      <Button
        noShadow
        className="h-10 w-10 rounded-full bg-[#2df505] p-0"
        onClick={getShortestPath}
      >
        <FaPlay className="ml-0.5 h-full w-full fill-white p-2.5" />
      </Button>

      <Grid />
    </div>
  )
}

// change icons for start and end
