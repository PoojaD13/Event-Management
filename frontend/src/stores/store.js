// import { configureStore } from "@reduxjs/toolkit";
// // import authReducer from "./slices/authSlice";
// import authReducer from "./slices/authSlices"

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});