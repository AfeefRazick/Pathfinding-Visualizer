/* eslint-disable react/prop-types */
import { useGraphContext } from "../context/graphContext";
import { Cell } from "./Cell";
import { useDragEvents } from "../hooks/useDragEvents";
import { getID } from "../helpers/getId";

export const Grid = () => {
  const { graph } = useGraphContext();
  const { onDrag, onDragOver, onDrop } = useDragEvents();

  return (
    <div
      onDrag={onDrag}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`grid grid-rows-[repeat(15,28px)] grid-cols-[repeat(30,28px)] bg-white`}
    >
      {graph.nodes.map((node, index) => {
        return <Cell key={index} node={node} />;
      })}
    </div>
  );
};
