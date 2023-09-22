export function manhattanDist(node, endNode) {
  let d1 = Math.abs(endNode.position.row - node.position.row);
  let d2 = Math.abs(endNode.position.col - node.position.col);

  return d1 + d2;
}
