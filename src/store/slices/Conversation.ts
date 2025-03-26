//@ts-ignore
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sortMessagesByTimestamp } from "../../utils/Helpers";

export type IMessage = {
    body: string | null,
    authorID: string | null,
    timestamp: number
};

export type IConversation = {
    conversing: string | null;
    messages: IMessage[];
    conversation: IMessage[];
};

const initialState: IConversation = {
    conversing: null,
    messages: [],
    conversation: []
};

export const ConversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        startChat: (state, action: PayloadAction<string>) => {
            state.conversing = action.payload;
        },

        endChat: (state) => {
            state.conversing = null;
        },

        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },

        getConversation: (state, action: PayloadAction<{ senderID: string | null, recieverID: string | null }>) => {
            let matchedMessages = state.messages.filter(message => {
                const fromSender = message.authorID == action.payload.senderID;
                const fromReciever = message.authorID == action.payload.recieverID;

                return !(fromSender && fromReciever);
            })

            matchedMessages = sortMessagesByTimestamp(matchedMessages, []);

            state.conversation = matchedMessages;
        }
    },
});

export const { startChat, endChat, getConversation } = ConversationSlice.actions;

export default ConversationSlice.reducer;
