import { ControlBar } from "./ControlBar";
import { Grid } from "./Grid";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <ControlBar />
      <Grid />
    </div>
  );
};

// change icons for start and end
