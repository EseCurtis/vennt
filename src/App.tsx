import { useEffect } from "react"
import Screens from "./screens";
import ScreenItem from "./screens/components/ScreenItem";

function App() {

  useEffect(() => {
    document.querySelector(".splash-screen")?.classList.add("loaded");
  }, []);

  return (
    <div className="app">
      <Screens>
        <ScreenItem hash={"home"}>
          home
        </ScreenItem>
        <ScreenItem hash={""}>
          Wassupc
        </ScreenItem>
        
        <ScreenItem hash={"404"}>
          Wassupc
        </ScreenItem>
      </Screens>
    </div>
  )
}

export default App
