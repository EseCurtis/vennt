import React from "react";
import Button, { ButtonSecondary } from "../../components/button";
import { request, cancelRequest, startConversation } from "./actions/request";
import { startChat } from "../../store/slices/Conversation";

interface UserActionsProps {
  userType: string;
  user: any;
  userRequesting?: any;
  broadcaster: any;
  currentUserID: string;
}

const UserActions: React.FC<UserActionsProps> = ({
  userType,
  user,
  userRequesting,
  broadcaster,
  currentUserID,
}) => {
  return (
    <div className="flex gap-3">
      {userType === "listener" ? (
        <>
          <Button onClick={() => startConversation(broadcaster, user._id, currentUserID)}> Accept </Button>
          <ButtonSecondary onClick={() => cancelRequest(broadcaster, user._id)}> Reject </ButtonSecondary>
        </>
      ) : userRequesting ? (
        <>
          <ButtonSecondary onClick={() => cancelRequest(broadcaster, currentUserID)}>
            Cancel Request
          </ButtonSecondary>
        </>
      ) : (
        <>
          <Button onClick={() => request(broadcaster, user._id, currentUserID)}>
            Send Request
          </Button>
        </>
      )}
    </div>
  );
};

export default UserActions;
