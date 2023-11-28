//@ts-ignore
import Qwick from "qwickjs";
import { store } from "../store";
import { IVentSpaceUser, VentSpaceSlice } from "../store/slices/VentSpace";
import { IVentSpace, IUserSpace } from "../store/slices/Broadcaster";
import { UserSlice } from "../store/slices/User";
import { ConversationSlice } from "../store/slices/Conversation";

const useBroadcast = (UserID: string) => {
  const VentSpace: IVentSpace = {
    add: new Qwick("ventt-space:add", { allowLogging: false }),
    update: new Qwick("ventt-space:update", { allowLogging: false }),
    remove: new Qwick("ventt-space:remove", { allowLogging: false }),
    activeUsers: new Qwick("ventt-space:active-users", {
      allowLogging: false,
      info: { _id: UserID }
    })
  };

  const UserSpace: IUserSpace = {
    session: new Qwick(`${UserID}:[--self]`, {
      allowLogging: false,
      info: { _id: UserID }
    })
  };

  VentSpace.add.listen((newUser: IVentSpaceUser) => {
    console.log("added new user");
    store.dispatch(VentSpaceSlice.actions.addUser(newUser));

    const ActiveUsers = store.getState().ventSpace.activeUsers;
    VentSpace.activeUsers.broadcast(ActiveUsers, "public");
  });

  VentSpace.update.listen((updateData: any) => {
    console.log("edited a user");
    store.dispatch(VentSpaceSlice.actions.updateUser(updateData));

    if (updateData._id == UserID) {
      const UserState = store.getState().user;
      const updatedUser = {
        ...UserState,
        UserRequesting: updateData.requesting
      };

      if (updateData.conversing) {
        store.dispatch(
          ConversationSlice.actions.startChat(updateData.conversing)
        );
      }
      store.dispatch(UserSlice.actions.update(updatedUser));
    }

    const ActiveUsers = store.getState().ventSpace.activeUsers;
    VentSpace.activeUsers.broadcast(ActiveUsers, "public");
  });

  VentSpace.remove.listen((toBeRemovedUser: string) => {
    console.log("removed a user");
    store.dispatch(VentSpaceSlice.actions.removeUser(toBeRemovedUser));

    const ActiveUsers = store.getState().ventSpace.activeUsers;
    VentSpace.activeUsers.broadcast(ActiveUsers, "public");
  });

  VentSpace.activeUsers.listen((activeUsers: any[]) => {
    const existingUsers: any[] | null = store.getState().ventSpace.activeUsers;
    const newUsers = activeUsers;
    const mergedUsers = [...new Set([...(existingUsers || []), ...newUsers])];
    const newPool = mergedUsers;

    newPool.forEach((ActiveUser) => {
      store.dispatch(VentSpaceSlice.actions.addUser(ActiveUser));
    });
  });

  UserSpace.session.listen((payload: any) => {
    //console.log("recieved info:", payload);
    if (payload.message) {
      store.dispatch(ConversationSlice.actions.addMessage(payload.message));
    }
  });

  VentSpace.activeUsers.listenDisconnect(() => {
    store
      .getState()
      .ventSpace.activeUsers.forEach(async (user: { _id: string }) => {
        const isActive = await Qwick.channelExist(`${user._id}`);

        if (!isActive) {
          store.dispatch(VentSpaceSlice.actions.removeUser(user._id));
        }
      });
  });

  return { VentSpace, UserSpace };
};

export default useBroadcast;
