import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import secretReducer from "../features/secrets/secrettSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    secret: secretReducer,
  },
});
