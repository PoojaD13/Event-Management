// // // // import { createSlice } from "@reduxjs/toolkit";

// // // // const initialState = {
// // // //   user: null,
// // // //   token: localStorage.getItem("token"),
// // // //   isAuthenticated: false,
// // // // };

// // // // const authSlice = createSlice({
// // // //   name: "auth",
// // // //   initialState,
// // // //   reducers: {
// // // //     loginSuccess: (state, action) => {
// // // //       state.user = action.payload.user;
// // // //       state.token = action.payload.token;
// // // //       state.isAuthenticated = true;
// // // //     },
// // // //     logout: (state) => {
// // // //       state.user = null;
// // // //       state.token = null;
// // // //       state.isAuthenticated = false;
// // // //       localStorage.removeItem("token");
// // // //     },
// // // //   },
// // // // });

// // // // export const { loginSuccess, logout } = authSlice.actions;
// // // // export default authSlice.reducer;

// // // import { createSlice } from "@reduxjs/toolkit";

// // // const initialState = {
// // //   user: null,
// // //   token: localStorage.getItem("token"),
// // //   isAuthenticated: false,
// // //   role: null,
// // // };

// // // const authSlice = createSlice({
// // //   name: "auth",
// // //   initialState,
// // //   reducers: {
// // //     loginSuccess: (state, action) => {
// // //       state.user = action.payload.user;
// // //       state.token = action.payload.token;
// // //       state.role = action.payload.user.role;
// // //       state.isAuthenticated = true;

// // //       localStorage.setItem("token", action.payload.token);
// // //     },

// // //     logout: (state) => {
// // //       state.user = null;
// // //       state.token = null;
// // //       state.role = null;
// // //       state.isAuthenticated = false;

// // //       localStorage.removeItem("token");
// // //     },

// // //     setUser: (state, action) => {
// // //       state.user = action.payload;
// // //       state.role = action.payload.role;
// // //       state.isAuthenticated = true;
// // //     },
// // //   },
// // // });

// // // export const { loginSuccess, logout, setUser } = authSlice.actions;
// // // export default authSlice.reducer;

// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   user: null,
// //   token: localStorage.getItem("token") || null,
// // };

// // const authSlice = createSlice({
// //   name: "auth",

// //   initialState,

// //   reducers: {
// //     loginSuccess: (state, action) => {
// //       state.user = action.payload.user;
// //       state.token = action.payload.accessToken;

// //       localStorage.setItem("token", action.payload.accessToken);
// //     },

// //     logout: (state) => {
// //       state.user = null;
// //       state.token = null;

// //       localStorage.removeItem("token");
// //     },
// //   },
// // });

// // export const { loginSuccess, logout } = authSlice.actions;

// // export default authSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// // Read cached data strings safely from disk to prevent page-refresh state drops
// const cachedToken = localStorage.getItem("token") || null;
// const cachedUser = (() => {
//   try {
//     const userString = localStorage.getItem("user");
//     return userString ? JSON.parse(userString) : null;
//   } catch (err) {
//     console.error("Failed to parse cached user string session:", err);
//     return null;
//   }
// })();

// const initialState = {
//   user: cachedUser,
//   token: cachedToken,
//   isAuthenticated: !!cachedToken && !!cachedUser, // Derived truth flag for router speed checks
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // 🔐 Handles authentication mapping upon successful form submission responses
//     loginSuccess: (state, action) => {
//       // Handle payloads whether they come nested inside a '.data' wrapper or flat
//       const userPayload = action.payload?.user || action.payload;
//       const tokenPayload = action.payload?.accessToken || action.payload?.token || action.payload;

//       state.user = userPayload;
//       state.token = tokenPayload;
//       state.isAuthenticated = true;

//       // Commit items to localStorage to ensure state survival on browser reloads
//       localStorage.setItem("token", tokenPayload);
//       localStorage.setItem("user", JSON.stringify(userPayload));
//     },

//     // 🚪 Handles session wipes and destroys localized authorization strings safely
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },

//     // 🔄 Sync helper to manually patch updated account metrics dynamically
//     updateUserSession: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     }
//   },
// });

// export const { loginSuccess, logout, updateUserSession } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const cachedToken = localStorage.getItem("token") || null;
const cachedUser = (() => {
  try {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: cachedUser,
    token: cachedToken,
    isAuthenticated: !!cachedToken && !!cachedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      // ✅ FIX: Match the exact structural nesting shown in your database response log
      const responseData = action.payload?.data || action.payload;
      const userProfile = responseData?.user;
      const tokenString = responseData?.accessToken;

      if (!tokenString || !userProfile) {
        console.error("❌ Redux payload missing expected parameters:", action.payload);
        return;
      }

      state.user = userProfile;
      state.token = tokenString;
      state.isAuthenticated = true;

      localStorage.setItem("token", tokenString);
      localStorage.setItem("user", JSON.stringify(userProfile));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
