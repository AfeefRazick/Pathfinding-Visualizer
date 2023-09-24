type DistObject = {
  distance: number
  fromNode: number
  heuristic?: number
}

export const getPath = (dist: DistObject[], start: number, end: number) => {
  const path = []
  const distance = dist[end].distance
  let currentNode = end

  while (currentNode != start) {
    path.push(currentNode)
    currentNode = dist[currentNode].fromNode
  }
  path.reverse()
  path.pop()
  return { distance, path }
}
