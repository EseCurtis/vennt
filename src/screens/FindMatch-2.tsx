//@ts-ignore
import Qwick from "qwickjs";
import { useSelector } from "react-redux";
import Card, { Paragraph, Title } from "../components/card";
import Header from "../components/header";
import { HiMiniSignal } from "react-icons/hi2";
import { RootState } from "../store";
import ConditionalRender from "../components/ConditionalRender";
import { Fragment, useEffect, useState } from "react";
import Button, { ButtonSecondary } from "../components/button";

const SearchingForMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <HiMiniSignal className="text-[10em] text-[var(--accent)] animate-pulse" />
      <h3 className="text-center opacity-60">
        Finding the perfect match for your conversation. Please hold on!
      </h3>
    </div>
  );
};

export default function FindMatch2() {
  const { activeUsers } = useSelector((state: RootState) => state.ventSpace);
  const { UserID, UserType, UserName, UserRequesting } = useSelector(
    (state: RootState) => state.user
  );
  const broadcaster = useSelector((state: RootState) => state.broadcaster);
  const [matchedUsers, setMatchedUsers] = useState<any[]>([]);
  const [requestingUsers, setRequestingUsers] = useState<any[]>([]);
  const userInstances: any[number | string] = [];

  const messageUser = (userID: string) => {
    return 0;
    if (!userInstances[userID]) {
      userInstances[userID] = new Qwick(userID, { allowLogging: true });
    }

    userInstances[userID].broadcast("wassup!--" + userID, "public");
  };

  useEffect(() => {
    ///console.table(UserRequesting);
  }, []);

  useEffect(() => {
    //console.log(broadcaster);
  }, [broadcaster]);

  const requestConversation = (_id: string) => {
    if (broadcaster) {
      if (broadcaster.VentSpace) {
        broadcaster.VentSpace.update.broadcast({
          _id: UserID,
          requesting: _id
        });
      }
    }
  };

  const cancelConversation = () => {
    if (broadcaster) {
      if (broadcaster.VentSpace) {
        broadcaster.VentSpace.update.broadcast({
          _id: UserID,
          requesting: null
        });
      }
    }
  };

  useEffect(() => {
    if (activeUsers) {
      //console.log(activeUsers);
      setMatchedUsers(
        activeUsers.filter(
          (activeUser) =>
            activeUser.type !== "speaker" && activeUser._id !== UserID
        )
      );

      if (UserType === "listener") {
        const requestingUsersTemp: any[] = [];

        activeUsers.forEach((activeUser) => {
          if (activeUser.requesting == UserID) {
            requestingUsersTemp.push(activeUser);
          }
        });

        setRequestingUsers(requestingUsersTemp);
        //console.log("req:", requestingUsers);
      }
    }
  }, [activeUsers]);

  useEffect(() => {
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
          UserType: UserType
        });
      }
    }
  }, [broadcaster, UserID, UserType]);

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

      {/* <Card>
        {JSON.stringify(activeUsers)}
      </Card> */}

      <ConditionalRender condition={true} fallback={<SearchingForMatch />}>
        <div className="flex flex-col gap-3 mt-3">
          {(UserType == "listener" ? requestingUsers : matchedUsers)?.map(
            (matchedUser, i) => {
              return (
                <Fragment key={i}>
                  <Card>
                    <div
                      className="flex flex-col"
                      onClick={() => messageUser(matchedUser._id)}
                    >
                      <div>
                        <b>{matchedUser.username}</b>
                      </div>
                      <div className="flex items-center justify-start gap-3 text-xs mt-2">
                        <h3 className="flex px-2 py-1 text-center w-auto text-yellow-500 bg-yellow-600/30 rounded-lg">
                          {matchedUser.username}
                        </h3>
                        <h3 className="flex px-2 py-1 text-center w-auto text-green-500 bg-green-600/30 rounded-lg">
                          {matchedUser.type}
                        </h3>
                      </div>
                      <br />
                      <div className="flex gap-3">
                        {UserType == "listener" ? (
                          <>
                            <Button> Accept </Button>
                            <ButtonSecondary> Reject </ButtonSecondary>
                          </>
                        ) : UserRequesting ? (
                          <>
                            <ButtonSecondary
                              onClick={() => cancelConversation()}
                            >
                              Cancel Request
                            </ButtonSecondary>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() =>
                                requestConversation(matchedUser._id)
                              }
                            >
                              Send Request
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Fragment>
              );
            }
          )}
        </div>
      </ConditionalRender>
    </div>
  );
}
