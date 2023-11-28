// userCommunication.ts
//@ts-ignore
import Qwick from "qwickjs";
const instances: Qwick[string] = [];

const userCommunication = {
  messageUser: (userID: string, message: { body: string, authorID: string, timestamp: number }) => {
    if(!instances[userID]) {
      instances[userID] = new Qwick(userID, { allowLogging: false });
    }

    instances[userID].broadcast({ message: message }, "public");
  },
};

export default userCommunication;
