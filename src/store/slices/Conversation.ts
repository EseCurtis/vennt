//@ts-ignore
import Qwick from "qwickjs";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IConversation = {
    conversing: string | null;
};

const initialState: IConversation = {
    conversing: null
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
        }
    },
});

export const { startChat, endChat } = ConversationSlice.actions;

export default ConversationSlice.reducer;
