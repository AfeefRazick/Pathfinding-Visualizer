/* eslint-disable react/prop-types */
import { useGraphContext } from "../context/graphContext"
import { Cell } from "./Cell"
import { useDragEvents } from "../hooks/useDragEvents"

export const Grid = () => {
  const { graph } = useGraphContext()
  const { onDrag, onDragOver, onDrop } = useDragEvents()
  console.log(graph)
  return (
    <div
      onDrag={onDrag}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`grid grid-cols-[repeat(30,28px)] grid-rows-[repeat(15,28px)] bg-white`}
    >
      {graph.nodes.map((node, index) => {
        return <Cell key={index} node={node} />
      })}
    </div>
  )
}
