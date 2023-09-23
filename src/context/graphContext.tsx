/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { getGraph } from "../helpers/getGraph"
import { VERTEX_COUNT } from "../constants/graphValues"

const graphContext = createContext({})

export const useGraphContext = () => {
  return useContext(graphContext)
}

export const GraphProvider = ({ children }) => {
  const [graph, setGraph] = useState(
    getGraph(
      VERTEX_COUNT,
      221,
      227,
      [
        122, 152, 182, 212, 242, 272, 302, 123, 124, 125, 155, 185, 215, 214,
        213, 243, 274, 305,
        //
        316, 286, 256, 312, 282, 252, 223, 224, 225, 193, 163, 195, 165, 134,
        222, 253, 226, 255,
        //
        145, 175, 205, 235, 265, 295, 325, 144, 146, 147, 143,
      ],
      [
        130, 129, 128, 127, 157, 187, 217, 247, 277, 307, 308, 309, 310, 218,
        219, 220, 220,
        //
        141, 140, 139, 138, 168, 198, 228, 258, 288, 318, 319, 320, 321,
      ]
    )
  )

  return (
    <graphContext.Provider value={{ graph, setGraph }}>
      {children}
    </graphContext.Provider>
  )
}
