/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { DIJKSTRAS } from "../constants/algorithms"

const initialAppState = {
  isVisualizing: false,
  currentAlgorithm: DIJKSTRAS,
  addWeight: false,
  addWall: true,
  delayms: 1,
  weight: 1,
}
type AppState = typeof initialAppState

type AppContext = {
  appState: AppState
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

const appContext = createContext<AppContext>({
  appState: initialAppState,
  setAppState: () => {},
})

export const useAppContext = () => {
  return useContext(appContext)
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState<AppState>(initialAppState)

  return (
    <appContext.Provider value={{ appState, setAppState }}>
      {children}
    </appContext.Provider>
  )
}
