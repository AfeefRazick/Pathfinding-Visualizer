/* eslint-disable react/prop-types */
import { useGraphContext } from "../context/graphContext";
import { Cell } from "./Cell";

export const Grid = () => {
  const { graph, setGraph } = useGraphContext();
  const onDrop = (e) => {
    const dropTarget = e.target;
    const id = dropTarget.id.replace("cell-child-", "");
    setGraph((prev) => ({ ...prev, start: id }));
    console.log(id);
  };
  return (
    <div
      onDrag={(e) => {
        console.log(e.target);
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
