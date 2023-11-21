import { useEffect } from "react"
import Screens from "./components/screens";
import ScreenItem from "./components/screens/components/ScreenItem";
import Home from "./screens/Home";
import Navigator from "./components/navigator";

function App() {

  useEffect(() => {
    document.querySelector(".splash-screen")?.classList.add("loaded");
  }, []);

  return (
    <div className="app">
      <Screens>
        <ScreenItem hash={"home"}>
          <Home/>
        </ScreenItem>
        <ScreenItem hash={""}>
          <Home/>
        </ScreenItem>
        <ScreenItem hash={"404"}>
          Wassupc
        </ScreenItem>
      </Screens>
      
      <Navigator/>
    </div>
  )
}

export default App
