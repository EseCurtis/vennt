import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TVentSpaceUserType } from './VentSpace';

export interface IUserState {
  UserID: string | null;
  UserType: TVentSpaceUserType;
}

const initialState: IUserState = {
  UserID: null,
  UserType: "listener"
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    generateId: (state) => {
      if (!state.UserID) {
        state.UserID = uuidv4();
      }
    },
    setType: (state, action: { payload: TVentSpaceUserType }) => {
      state.UserType = action.payload
    },
  },
});

export const { generateId } = UserSlice.actions;

export default UserSlice.reducer;
