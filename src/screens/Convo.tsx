import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "../components/header";
import ConditionalRender from "../components/ConditionalRender";
import SearchingForMatch from "./components/SearchingForMatch";
import userCommunication from "./components/actions/userCommunication";
import broadcast from "./components/actions/broadcast";
import MatchedUsersCard from "./components/MatchedUsersCard";
import Card, { Title, Paragraph } from "../components/card";
import { HashRoute } from "../utils/Screen";

const Convo: React.FC = () => {
  const { activeUsers } = useSelector((state: any) => state.ventSpace);
  const { UserID, UserType, UserName, UserRequesting } = useSelector((state: any) => state.user);
  const broadcaster = useSelector((state: any) => state.broadcaster);
  const [matchedUsers, setMatchedUsers] = useState<any[]>([]);
  const [requestingUsers, setRequestingUsers] = useState<any[]>([]);

  useEffect(() => {
    if(!UserName) {
      HashRoute("home")
    }
  }, [UserName]);

  useEffect(() => {
    broadcast(broadcaster, UserID, UserType, UserName);
  }, [broadcaster, UserID, UserType, UserName]);

  useEffect(() => {
    if (activeUsers) {
      setMatchedUsers(
        activeUsers.filter(
          (activeUser: any) =>
            activeUser.type !== "speaker" && activeUser._id !== UserID
        )
      );

      if (UserType === "listener") {
        const requestingUsersTemp: any[] = [];

        activeUsers.forEach((activeUser: any) => {
          if (activeUser.requesting == UserID) {
            requestingUsersTemp.push(activeUser);
          }
        });

        setRequestingUsers(requestingUsersTemp);
        ///console.log("req:", requestingUsers);
      }
    }
  }, [activeUsers]);

  return (
    <div className="p-5">
      <Header />

      <div className="text-center">
        <Card>
          <Title>Vennt Conversations 🌟</Title>
          <div className="flex items-center justify-center gap-3">
            <h3 className="flex px-2 py-1 text-center w-auto text-yellow-500 bg-yellow-600/30 rounded-lg">
              {UserName}
            </h3>
            <h3 className="flex px-2 py-1 text-center w-auto text-green-500 bg-green-600/30 rounded-lg">
              {UserType}
            </h3>
          </div>
          <Paragraph>
            Kindness goes a long way. Share your thoughts, lend an ear, and
            create a supportive atmosphere.
          </Paragraph>
        </Card>
      </div>

      <div className="flex flex-col gap-3 mt-3">
        {UserType === "listener" ? (
          <ConditionalRender condition={true} fallback={<SearchingForMatch />}>
            {requestingUsers.map((matchedUser, i) => (
              <Fragment key={i}>
                <MatchedUsersCard
                  userType={UserType}
                  user={matchedUser}
                  userCommunication={userCommunication}
                  broadcaster={broadcaster}
                  currentUserID={UserID}
                />
              </Fragment>
            ))}
          </ConditionalRender>
        ) : (
          <ConditionalRender condition={true} fallback={<SearchingForMatch />}>
            {matchedUsers.map((matchedUser, i) => (
              <Fragment key={i}>
                <MatchedUsersCard
                  userType={UserType}
                  user={matchedUser}
                  userRequesting={UserRequesting}
                  userCommunication={userCommunication}
                  broadcaster={broadcaster}
                  currentUserID={UserID}
                />
              </Fragment>
            ))}
          </ConditionalRender>
        )}
      </div>
    </div>
  );
};

export default Convo;
