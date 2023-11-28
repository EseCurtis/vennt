import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './slices/User';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { VentSpaceSlice } from './slices/VentSpace';
import { BroadcasterSlice } from './slices/Broadcaster';
import { ConversationSlice } from './slices/Conversation';

const userPersistConfig = {
  key: 'user',
  storage,
};

const conversationPersistConfig = {
  key: 'conversation',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, UserSlice.reducer);
//const persistedConversationReducer = persistReducer(conversationPersistConfig, ConversationSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    ventSpace: VentSpaceSlice.reducer,
    broadcaster: BroadcasterSlice.reducer,
    conversation: ConversationSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
