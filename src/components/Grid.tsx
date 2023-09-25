/* eslint-disable react/prop-types */
import { useGraphContext } from "../context/graphContext"
import { Cell } from "./Cell"
import { useDragEvents } from "../hooks/useDragEvents"
import { Node } from "../classes/Graph"

export const Grid = () => {
  const { graph } = useGraphContext()
  const { onDrag, onDragOver, onDrop } = useDragEvents()
  console.log(graph)

  return (
    <div
      onDrag={onDrag}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`grid grid-cols-[repeat(30,12px)] grid-rows-[repeat(15,12px)] bg-white md:grid-cols-[repeat(30,28px)] md:grid-rows-[repeat(15,28px)]`}
    >
      {graph.nodes.map((node: Node, index: number) => {
        return <Cell key={index} node={node} />
      })}
    </div>
  )
}
