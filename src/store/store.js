import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from "./toolsSlice";
import workReducer from "./workSlice";

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    work: workReducer,
  },
});
