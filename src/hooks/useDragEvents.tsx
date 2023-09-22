import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useGraphContext } from "../context/graphContext";
import { getID } from "../helpers/getId";
import { getGraph } from "../helpers/getGraph";

export const useDragEvents = () => {
  const { graph, setGraph } = useGraphContext();
  const { appState } = useAppContext();
  const [drag, setDrag] = useState({
    isDragging: false, //prevents unnecassary rerenders
    dragItem: null,
  });

  const onDrag = (e) => {
    if (appState.isVisualizing) return;

    if (!drag.isDragging) {
      const id = getID(e.target);

      if (graph.nodes[id].isStart) {
        setDrag((prev) => ({
          ...prev,
          isDragging: true,
          dragItem: "start",
        }));
      } else if (graph.nodes[id].isEnd) {
        setDrag((prev) => ({ ...prev, isDragging: true, dragItem: "end" }));
      } else {
        // make wall
        setDrag((prev) => ({ ...prev, isDragging: false, dragItem: "wall" }));
      }
    }
  };
  const onDragOver = (e) => {
    if (appState.isVisualizing) return;
    e.preventDefault();

    // if (drag.isDragging) e.preventDefault();
    if (drag.dragItem === "wall") {
      const draggedOverID = getID(e.target);

      setGraph((prev) =>
        getGraph(prev.V, prev.start, prev.end, [...prev.walls, draggedOverID])
      );
      setDrag((prev) => ({ ...prev, isDragging: false, dragItem: null }));
    }
  };

  const onDrop = (e) => {
    if (appState.isVisualizing) return;
    const dropTargetID = getID(e.target);

    if (dropTargetID === graph.start || dropTargetID === graph.end) {
      return setDrag((prev) => ({
        ...prev,
        isDragging: false,
        dragItem: null,
      }));
    }

    if (drag.dragItem === "start") {
      setGraph((prev) => getGraph(prev.V, dropTargetID, prev.end, prev.walls));
    }
    if (drag.dragItem === "end") {
      setGraph((prev) =>
        getGraph(prev.V, prev.start, dropTargetID, prev.walls)
      );
    }
    setDrag((prev) => ({ ...prev, isDragging: false, dragItem: null }));
  };
  return { onDrag, onDragOver, onDrop };
};
