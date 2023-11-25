import { useEffect, useState } from "react";
import Screens from "./components/screens";
import ScreenItem from "./components/screens/components/ScreenItem";
import Home from "./screens/Home";
import Navigator from "./components/navigator";
import Settings from "./screens/Settings";
import PageNotFound from "./screens/PageNotFound";
import Conversation from "./screens/Conversation";
import ScreenItemProtected from "./components/screens/components/ScreenItemProtected";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { UserSlice } from "./store/slices/User";
import { BroadcasterSlice } from "./store/slices/Broadcaster";
import useBroadcast from "./broadcast";
import Convo from "./screens/Convo";

function App() {
  const dispatcher = useDispatch();
  const { UserID } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    document.querySelector(".splash-screen")?.classList.add("loaded");
    dispatcher(UserSlice.actions.generateId());
  }, []);

  useEffect(() => {
    if (UserID) {
      dispatcher(BroadcasterSlice.actions.init(useBroadcast(UserID)));
    }
  }, [UserID]);

  return (
    <div className="app">
      <Screens>
        <ScreenItem hash={"home"}>
          <Home />
        </ScreenItem>
        <ScreenItem hash={""}>
          <Home />
        </ScreenItem>
        <ScreenItem hash={"settings"}>
          <Settings />
        </ScreenItem>
        <ScreenItemProtected
          hash={"conversation"}
          condition={true}
          fallbackHash="home"
        >
          <Convo />
        </ScreenItemProtected>
        <ScreenItem hash={"404"} flags="--404">
          <PageNotFound />
        </ScreenItem>
      </Screens>

      <Navigator />
    </div>
  );
}

export default App;
