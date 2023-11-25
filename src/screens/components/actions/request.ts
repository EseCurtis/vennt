// request.ts
interface Broadcaster {
    VentSpace: {
      update: {
        broadcast: (data: any, type?: "public" | "self") => void;
      };
    };
  }
  
  const request = (broadcaster: Broadcaster, _id: string, UserID: string) => {
    if (broadcaster && broadcaster.VentSpace) {
      broadcaster.VentSpace.update.broadcast({
        _id: UserID,
        requesting: _id,
      });
    }
  };
  
  const cancelRequest = (broadcaster: Broadcaster, UserID: string) => {
    if (broadcaster && broadcaster.VentSpace) {
      broadcaster.VentSpace.update.broadcast({
        _id: UserID,
        requesting: null,
      });
    }
  };

  const startConversation = (broadcaster: Broadcaster, UserID: string, conversing: string) => {
    if (broadcaster && broadcaster.VentSpace) {
      broadcaster.VentSpace.update.broadcast({
        _id: UserID,
        conversing,
        requesting: null,
      }, "public");

      broadcaster.VentSpace.update.broadcast({
        _id: conversing,
        conversing: UserID,
        requesting: null,
      }, "public");
    }
  };
  
  export { request, cancelRequest, startConversation };
  