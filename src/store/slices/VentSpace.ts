import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
    activeUsers: any[] | null;
}

export type TVentSpaceUserType = "listener" | "speaker";

export interface IVentSpaceUser {
    _id: string;
    type: TVentSpaceUserType;
}


const initialState: IUserState = {
    activeUsers: [],
};

export const VentSpaceSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IVentSpaceUser>) => {
            const userToAdd = action.payload;
            if (
                state.activeUsers &&
                !state.activeUsers.some((user) => user._id === userToAdd._id)
            ) {
                state.activeUsers = [...state.activeUsers, userToAdd];
            }
        },


        removeUser: (state, action: PayloadAction<string>) => {
            state.activeUsers = state.activeUsers || [];
            state.activeUsers = state.activeUsers.filter(user => user !== action.payload);
        },
    },
});

export const { addUser, removeUser } = VentSpaceSlice.actions;

export default VentSpaceSlice.reducer;
