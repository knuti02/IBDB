import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userData";
import darkmode from "./darkmode";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    darkmode: darkmode,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
