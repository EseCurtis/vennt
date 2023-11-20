import { useEffect } from "react"

function App() {

  useEffect(() => {
    document.querySelector(".splash-screen")?.classList.add("loaded");
  }, []);

  return (
    <div className="app">
      <h1>Wassup!</h1>
    </div>
  )
}

export default App
