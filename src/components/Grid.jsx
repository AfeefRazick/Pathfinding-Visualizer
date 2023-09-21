/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGraphContext } from "../context/graphContext";
import { getGraph } from "../helpers/getGraph";
import { getID } from "../helpers/getId";
import { Cell } from "./Cell";

export const Grid = () => {
  const { graph, setGraph } = useGraphContext();
  const [drag, setDrag] = useState({
    isDragging: false,
    dragItem: null,
  });

  const onDrop = (e) => {
    const dropTargetID = getID(e.target);

    if (dropTargetID === graph.start || dropTargetID === graph.end) return;

    if (drag.dragItem === "start") {
      setGraph(getGraph(800, dropTargetID, graph.end));
      console.log("start");
    }
    if (drag.dragItem === "end") {
      setGraph(getGraph(800, graph.start, dropTargetID));
      console.log("end");
    }
    setDrag((prev) => ({ ...prev, isDragging: false }));
    console.log(dropTargetID);
  };

  return (
    <div
      onDrag={(e) => {
        if (!drag.isDragging) {
          const id = getID(e.target);

          if (graph.nodes[id].isStart) {
            setDrag((prev) => ({
              ...prev,
              isDragging: true,
              dragItem: "start",
            }));
          }
          if (graph.nodes[id].isEnd) {
            setDrag((prev) => ({ ...prev, isDragging: true, dragItem: "end" }));
          }

          console.log(e.target);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDrop}
      className="grid grid-rows-[repeat(20,24px)] grid-cols-[repeat(40,24px)] border border-solid border-black"
    >
      {graph.nodes.map((node, index) => {
        return <Cell key={index} node={node} />;
      })}
    </div>
  );
};
