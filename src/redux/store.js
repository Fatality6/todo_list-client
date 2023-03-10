import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import taskSlice from "./features/task/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
  },
});
