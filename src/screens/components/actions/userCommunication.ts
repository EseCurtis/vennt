// userCommunication.ts

import Qwick from "../../../utils/plugins";

//@ts-ignore
const instances: any[string] = [];

const userCommunication = {
  messageUser: (userID: string, message: { body: string, authorID: string, timestamp: number }) => {
    if(!instances[userID]) {
      instances[userID] = new Qwick(userID, { allowLogging: false });
    }

    instances[userID].broadcast({ message: message }, "public");
  },
};

export default userCommunication;
