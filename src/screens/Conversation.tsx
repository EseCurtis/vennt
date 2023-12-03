import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { HashRoute, matchesRoute } from "../utils/Screen";
import { VentSpaceSlice } from "../store/slices/VentSpace";
import { HiArrowUp, HiMiniHeart, HiUsers, HiXMark } from "react-icons/hi2";
import userCommunication from "./components/actions/userCommunication";
import { ConversationSlice } from "../store/slices/Conversation";
import moment from "moment-timezone";

const MessageBubble = ({ UserID, message }: any) => {
  const defaultStyle = " flex flex-col px-5 py-2 rounded-lg mb-2 break-words";
  const [timeAgo, setTimeAgo] = useState<string>(
    moment(message.timestamp).fromNow()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(moment(message.timestamp).fromNow());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [message.timestamp]);

  return UserID == message.authorID ? (
    <div className="flex justify-end">
      <div
        className={
          "max-w-[70%] bg-[var(--accent-opaque)]  border border-[var(--accent)]" +
          defaultStyle
        }
      >
        {message.body}
        <span className="text-xs mt-1 opacity-40">{timeAgo}</span>
      </div>
    </div>
  ) : (
    <div className="flex justify-start">
      <div
        className={
          "max-w-[70%] bg-[var(--bg-secondary)] border border-[var(--bg-secondary-2)]" +
          defaultStyle
        }
      >
        {message.body}
        <span className="text-xs mt-1 opacity-40">{timeAgo}</span>
      </div>
    </div>
  );
};

export default function Conversation() {
  const dispatcher = useDispatch();
  const chatboxRef: RefObject<HTMLDivElement> = useRef(null);
  //const { VentSpace } = useSelector((state: RootState) => state.broadcaster);
  const { UserID, UserType } = useSelector((state: RootState) => state.user);
  const { searchedUser, activeUsers } = useSelector(
    (state: RootState) => state.ventSpace
  );
  const { conversing, messages, conversation } = useSelector(
    (state: RootState) => state.conversation
  );
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!conversing && matchesRoute("conversation")) {
      HashRoute("home");
    }
  }, []);

  useEffect(() => {
    if (searchedUser.length > 0 && matchesRoute("conversation")) {
      dispatcher(VentSpaceSlice.actions.getActiveUser(searchedUser[0]?._id));

      //console.log("searched user:", searchedUser);
      if (searchedUser.length < 1) {
        HashRoute("home");
      }
    }
  }, [activeUsers]);

  useEffect(() => {
    setChatMessages(conversation);
    setTimeout(() => {
      chatboxRef.current?.scrollTo({
        top: chatboxRef.current.scrollHeight * 2,
        behavior: "smooth"
      });
    }, 0);
  }, [conversation]);

  useEffect(() => {
    if (messages && searchedUser) {
      dispatcher(
        ConversationSlice.actions.getConversation({
          senderID: UserID,
          recieverID: searchedUser[0]?._id
        })
      );
    }
  }, [messages]);

  useEffect(() => {
    if (conversing) {
      dispatcher(VentSpaceSlice.actions.getActiveUser(conversing));
    }
    //console.log("life:",conversing);
  }, [conversing]);

  const isMessageEmpty = message.trim() === "";

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const sentMessage = {
      body: message,
      authorID: UserID!,
      timestamp: new Date().getTime()
    };

    if (sentMessage) {
      userCommunication.messageUser(searchedUser[0]._id, sentMessage);
      dispatcher(ConversationSlice.actions.addMessage(sentMessage));

      setMessage("");
    }
  };

  return (
    <div ref={chatboxRef} className="p-5 overflow-y-scroll max-h-full">
      <div className="p-3 px-1 flex items-center justify-start gap-2 pb-4 border-b border-[var(--bg-secondary-2)]">
        <span className="py-1 px-2 bg-[var(--accent-opaque)] text-[var(--accent-light)] rounded-lg">
          {searchedUser[0]?.username}
        </span>
        <span className="text-[var(--accent-light)]">
          {UserType == "listener" ? <HiUsers /> : <HiMiniHeart />}
        </span>
        <span className="ml-auto flex items-center justify-start gap-2 bg-[var(--bg-secondary)] p-1 px-2 rounded-lg">
          <HiXMark /> close
        </span>
      </div>
      <div className="flex flex-col pt-3">
        {chatMessages.map((message, i) => (
          <Fragment key={i}>
            <MessageBubble UserID={UserID} message={message} />
          </Fragment>
        ))}
      </div>

      <div className="text-box absolute z-50 bg-[var(--bg-secondary)] w-[100%] h-[70px] bottom-1 left-[50%] translate-x-[-50%] border-t border-[var(--bg-secondary-2)]">
        <form
          className="flex h-full w-[100%] p-4 items-center justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="p-3 outline-none border-none rounded-xl bg-[var(--bg-secondary-2)] w-[70%]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button
            type="submit"
            className={`transition-all bg-[var(--accent)] p-3 rounded-xl active:scale-90 ${
              isMessageEmpty ? "grayscale opacity-50 pointer-events-none" : ""
            }`}
            disabled={isMessageEmpty}
          >
            <HiArrowUp />
          </button>
        </form>
      </div>
    </div>
  );
}
