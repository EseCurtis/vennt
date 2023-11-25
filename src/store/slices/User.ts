import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TVentSpaceUserType } from './VentSpace';
import { generateRandomListener, generateRandomPersonSharing } from '../../utils/NicknameGenerator';

type TStringValue = string | null;

export interface IUserState {
  UserID: TStringValue;
  UserType: TVentSpaceUserType | null;
  UserName: TStringValue;
  UserRequesting: TStringValue;
  UserConversing: TStringValue;
}

const initialState: IUserState = {
  UserID: null,
  UserType: null,
  UserName: null,
  UserRequesting: null,
  UserConversing: null,
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

    setRequesting: (state, action: { payload: string }) => {
      state.UserRequesting = action.payload
    },

    update: (state, action: { payload: IUserState }) => {
      state.UserRequesting = action.payload.UserRequesting;
      state.UserConversing = action.payload.UserConversing;
    },

    generateUsername: (state, action: { payload: TVentSpaceUserType }) => {
      if (!state.UserName) {
        switch (action.payload) {
          case "listener":
            state.UserName = generateRandomListener();
            break;
          case "speaker":
            state.UserName = generateRandomPersonSharing();
            break;
          default:
            break;
        }
      }

    }
  },
});

export const { generateId, generateUsername } = UserSlice.actions;

export default UserSlice.reducer;
