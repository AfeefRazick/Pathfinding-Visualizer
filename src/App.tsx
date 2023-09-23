/* eslint-disable react/prop-types */

import { GraphProvider } from "./context/graphContext"
import { Hero } from "./components/Hero"
import { AppProvider } from "./context/appContext"

const App = () => {
  return (
    <GraphProvider>
      <AppProvider>
        <Hero />
      </AppProvider>
    </GraphProvider>
  )
}

export default App
