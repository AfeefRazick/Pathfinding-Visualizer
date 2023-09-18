/* eslint-disable react/prop-types */
import { useGraphContext } from "../context/graphContext";
import { Cell } from "./Cell";

export const Grid = () => {
  const { graph } = useGraphContext();

  return (
    <div className="grid grid-rows-[repeat(20,24px)] grid-cols-[repeat(40,24px)] border border-solid border-black">
      {graph.nodes.map((node, index) => {
        return <Cell key={index} node={node} />;
      })}
    </div>
  );
};
