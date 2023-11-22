//@ts-ignore
import Qwick from "qwickjs";
import { AppDispatch, store } from "../store";
import { IVentSpaceUser, VentSpaceSlice } from "../store/slices/VentSpace";

export interface IVentSpace {
  add: Qwick;
  remove: Qwick;
  activeUsers: Qwick;
}

export interface IUserSpace {}

export type IBroadcast = {
  VentSpace: IVentSpace;
  UserSpace: IUserSpace;
};

const useBroadcast = (UserID: string | null) => {
  const VentSpace: IVentSpace = {
    add: new Qwick("ventt-space:add", { allowLogging: false }),
    remove: new Qwick("ventt-space:remove", { allowLogging: false }),
    activeUsers: new Qwick("ventt-space:active-users", { allowLogging: false })
  };

  const UserSpace: IUserSpace = new Qwick(UserID, { allowLogging: false });

  VentSpace.add.listen((newUser: IVentSpaceUser) => {
    console.log("added new user");
    store.dispatch(VentSpaceSlice.actions.addUser(newUser));

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

  return { VentSpace, UserSpace };
};

export default useBroadcast;
