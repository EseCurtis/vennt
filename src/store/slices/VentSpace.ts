import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TVentSpaceUserType = "listener" | "speaker";

export interface IVentSpaceUser {
    _id: string;
    _self:boolean;
    type: TVentSpaceUserType;
    requesting: string | null;
    username?: string;
}

export interface IVentSpaceState {
    activeUsers: any[];
    searchedUser: IVentSpaceUser[];
}

const initialState: IVentSpaceState = {
    activeUsers: [],
    searchedUser: []
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
                    ////console.log(updatedUser);
                    return updatedUser;
                } else {
                    return user;
                }
            });
        },

        getActiveUser: (state, action: PayloadAction<string>) => {
            state.searchedUser = state.activeUsers.filter(user => user._id == action.payload);
        },

        removeUser: (state, action: PayloadAction<string>) => {
            state.activeUsers = state.activeUsers || [];
            state.activeUsers = state.activeUsers.filter(user => user._id !== action.payload);
        }
    },
});

export const { addUser, removeUser } = VentSpaceSlice.actions;

export default VentSpaceSlice.reducer;
