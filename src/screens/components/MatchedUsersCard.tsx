// MatchedUsersCard.tsx
import React from "react";
import Card from "../../components/card";
import UserDetails from "./UserDetails";
import UserActions from "./UserActions";

interface MatchedUsersCardProps {
  userType: string;
  user: any;
  userRequesting?: any;
  userCommunication: any;
  broadcaster: any;
  currentUserID: string;
}

const MatchedUsersCard: React.FC<MatchedUsersCardProps> = ({
  userType,
  user,
  userRequesting,
  userCommunication,
  broadcaster,
  currentUserID,
}) => {
  return (
    <Card>
      <div className="flex flex-col" onClick={() => userCommunication.messageUser(user._id)}>
        <div>
          <b>{user.username}</b>
        </div>
        <UserDetails username={user.username} type={user.type} />
        <br />
        <UserActions
          userType={userType}
          user={user}
          userRequesting={userRequesting}
          broadcaster={broadcaster}
          currentUserID={currentUserID}
        />
      </div>
    </Card>
  );
};

export default MatchedUsersCard;
