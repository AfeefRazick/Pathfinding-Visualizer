export const getShortestPath = (dist, start, end) => {
  const path = [];
  let distance = dist[end].distance;
  let currentNode = end;

  while (currentNode != start) {
    path.push(currentNode);
    currentNode = dist[currentNode].fromNode;
  }
  path.reverse();
  path.pop();
  return { distance, path };
};
