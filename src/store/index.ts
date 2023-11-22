import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './slices/User';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { VentSpaceSlice } from './slices/VentSpace';

const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, UserSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    ventSpace: VentSpaceSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
