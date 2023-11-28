//@ts-ignore
import Qwick from "qwickjs";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//import useBroadcast from "../../broadcast";

export interface IVentSpace {
    add: Qwick;
    update: Qwick;
    remove: Qwick;
    activeUsers: Qwick;
}

export interface IUserSpace {
    session: Qwick;
}


export type IBroadcast = {
    VentSpace: IVentSpace | null;
    UserSpace: IUserSpace | null;
};

const initialState: IBroadcast = {
    VentSpace: null,
    UserSpace: null,
};

export const BroadcasterSlice = createSlice({
    name: 'broadcaster',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<IBroadcast>) => {
            state.VentSpace = action.payload.VentSpace;
            state.UserSpace = action.payload.UserSpace;
        }
    },
});

export const { init } = BroadcasterSlice.actions;

export default BroadcasterSlice.reducer;
