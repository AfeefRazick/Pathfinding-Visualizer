/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { DIJKSTRAS } from "../constants/algorithms"

const appContext = createContext(null)

export const useAppContext = () => {
  return useContext(appContext)
}

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    isVisualizing: false,
    currentAlgorithm: DIJKSTRAS,
    addWeight: true,
  })

  return (
    <appContext.Provider value={{ appState, setAppState }}>
      {children}
    </appContext.Provider>
  )
}
