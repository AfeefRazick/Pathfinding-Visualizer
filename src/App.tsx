/* eslint-disable react/prop-types */

import { GraphProvider } from "./context/graphContext"
import { Hero } from "./components/Hero"
import { AppProvider } from "./context/appContext"

const App = () => {
  return (
    <AppProvider>
      <GraphProvider>
        <Hero />
      </GraphProvider>
    </AppProvider>
  )
}

export default App
