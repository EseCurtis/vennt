import { IBroadcast } from "../../../store/slices/Broadcaster";

const broadcast = (broadcaster: IBroadcast, UserID: string, UserType: string, UserName: string) => {
    if (broadcaster && UserID && UserType && UserName) {
        if (broadcaster.VentSpace) {
            broadcaster.VentSpace.add.broadcast(
                { _id: UserID, type: UserType, username: UserName },
                "public"
            );
        }
    }
    
    if (broadcaster && UserID) {
        if (broadcaster.VentSpace) {
            broadcaster.VentSpace.update.broadcast({
                _id: UserID,
                UserType: UserType,
            });
        }
    }
};

export default broadcast;
