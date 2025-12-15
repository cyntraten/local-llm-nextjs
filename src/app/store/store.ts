import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chats/chatsSlice";
import modelsReducer from "./models/modelsSlice";

export const store = () =>
  configureStore({
    reducer: {
      chats: chatsReducer,
      models: modelsReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
