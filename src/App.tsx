import { useEffect } from "react"
import Screens from "./components/screens";
import ScreenItem from "./components/screens/components/ScreenItem";
import Home from "./screens/Home";
import Navigator from "./components/navigator";
import { HiInformationCircle } from "react-icons/hi2";

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
        <ScreenItem hash={"settings"}>
          <h1>settings</h1>
        </ScreenItem>
        <ScreenItem hash={"404"}>
          <center>
            <HiInformationCircle/>
            <h1>404 page not Found</h1>
          </center>
        </ScreenItem>
      </Screens>
      
      <Navigator/>
    </div>
  )
}

export default App
