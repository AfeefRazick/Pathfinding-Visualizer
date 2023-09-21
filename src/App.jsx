/* eslint-disable react/prop-types */

import { GraphProvider } from "./context/graphContext";
import { Hero } from "./components/Hero";

const App = () => {
  return (
    <GraphProvider>
      <Hero />
    </GraphProvider>
  );
};

export default App;
