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
import { UserSlice } from "./store/slices/User";
import { RootState } from "./store";
import useBroadcast, { IBroadcast } from "./broadcast";

function App() {
  const { UserID, UserType } = useSelector((state: RootState) => state.user);
  const activeUsers = useSelector(
    (state: RootState) => state.ventSpace.activeUsers
  );
  const dispatcher = useDispatch();
  const [broadcaster, setBroadcaster] = useState<IBroadcast | null>(null);

  useEffect(() => {
    document.querySelector(".splash-screen")?.classList.add("loaded");
    dispatcher(UserSlice.actions.generateId());
    dispatcher(UserSlice.actions.setType("listener"));
  }, []);

  useEffect(() => {
    setBroadcaster(useBroadcast(UserID));
  }, [UserID]);

  useEffect(() => {
    if (broadcaster) {
      broadcaster.VentSpace.add.broadcast({ _id: UserID, type: UserType }, "public");
    }
  }, [broadcaster]);

  useEffect(() => {
    console.log(activeUsers);
  }, [activeUsers]);


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
          <Conversation />
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
