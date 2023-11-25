import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '..';

export interface IUserState {
    activeUsers: any[];
}

export type TVentSpaceUserType = "listener" | "speaker";

export interface IVentSpaceUser {
    _id: string;
    _self:boolean;
    type: TVentSpaceUserType;
    requesting: string | null;
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
            } else if(state.activeUsers) {
                state.activeUsers = state.activeUsers.map(activeUser => {
                    if(activeUser._id == userToAdd._id) {
                        activeUser = {...activeUser, ...userToAdd};
                    }

                    return activeUser;
                })
            }
        },

        updateUser: (state, action: PayloadAction<IVentSpaceUser>) => {
            state.activeUsers = state.activeUsers.map(user => {
                if(user._id == action.payload._id) {
                    const updatedUser = {...user, ...action.payload};
                    //console.log(updatedUser);
                    return updatedUser;
                } else {
                    return user;
                }
            });
        },

        removeUser: (state, action: PayloadAction<string>) => {
            state.activeUsers = state.activeUsers || [];
            state.activeUsers = state.activeUsers.filter(user => user._id !== action.payload);
        }
    },
});

export const { addUser, removeUser } = VentSpaceSlice.actions;

export default VentSpaceSlice.reducer;
