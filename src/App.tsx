import { useEffect } from "react"
import Screens from "./components/screens";
import ScreenItem from "./components/screens/components/ScreenItem";
import Home from "./screens/Home";
import Navigator from "./components/navigator";
import { HiInformationCircle } from "react-icons/hi2";
import Settings from "./screens/Settings";
import PageNotFound from "./screens/PageNotFound";
import Conversation from "./screens/Conversation";
import ScreenItemProtected from "./components/screens/components/ScreenItemProtected";

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
          <Settings/>
        </ScreenItem>
        <ScreenItemProtected hash={"conversation"} condition={true} fallbackHash="home" >
          <Conversation/>
        </ScreenItemProtected>
        <ScreenItem hash={"404"} flags="--404">
          <PageNotFound/>
        </ScreenItem>
      </Screens>
      
      <Navigator/>
    </div>
  )
}

export default App
