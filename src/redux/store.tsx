import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userData";
import userItems from "./userItems";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    userItems: userItems,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
