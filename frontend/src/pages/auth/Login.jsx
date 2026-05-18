// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // // import { loginSuccess } from "../../stores/slices/authSlice";
// // import { loginSuccess } from "../../stores/slices/authSlices";
// // import { loginUser } from "../../services/auth.api";
// // import { useNavigate } from "react-router-dom";

// // export default function Login() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {

// //       const data = await loginUser(form);
// //           console.log("Api Response " , data)

// //       dispatch(loginSuccess(data.data));

// //       navigate("/");
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-xl shadow-md w-96"
// //       >
// //         <h2 className="text-2xl font-bold mb-6">Login</h2>

// //         <input
// //           name="email"
// //           placeholder="Email"
// //           onChange={handleChange}
// //           className="w-full p-2 border mb-4"
// //         />

// //         <input
// //           name="password"
// //           type="password"
// //           placeholder="Password"
// //           onChange={handleChange}
// //           className="w-full p-2 border mb-4"
// //         />

// //         <button className="w-full bg-blue-600 text-white p-2 rounded">
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../stores/slices/authSlices";
// import { loginUser } from "../../services/auth.api";
// import { useNavigate } from "react-router-dom";
// import SunriseParticles from "../../components/background/SunriseParticles";

// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await loginUser(form);

//       console.log("API Response:", res);

//       if (!res?.data?.accessToken) {
//         throw new Error("Invalid response from server");
//       }

//       dispatch(loginSuccess(res.data));

//       navigate("/");
//     } catch (err) {
//       console.log(err);

//       setError(err.response?.data?.message || err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // return (
//   //   <div className="flex items-center justify-center h-screen bg-gray-100">
//   //     <form
//   //       onSubmit={handleSubmit}
//   //       className="bg-white p-8 rounded-xl shadow-md w-96"
//   //     >
//   //       <h2 className="text-2xl font-bold mb-6">Login</h2>

//   //       {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//   //       <input
//   //         name="email"
//   //         value={form.email}
//   //         placeholder="Email"
//   //         onChange={handleChange}
//   //         className="w-full p-2 border mb-4"
//   //       />

//   //       <input
//   //         name="password"
//   //         type="password"
//   //         value={form.password}
//   //         placeholder="Password"
//   //         onChange={handleChange}
//   //         className="w-full p-2 border mb-4"
//   //       />

//   //       <button
//   //         disabled={loading}
//   //         className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
//   //       >
//   //         {loading ? "Logging in..." : "Login"}
//   //       </button>
//   //     </form>
//   //   </div>
//   // );
//   // return (
//   //   <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
//   //     <form
//   //       onSubmit={handleSubmit}
//   //       className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white"
//   //     >
//   //       <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

//   //       <p className="text-center text-sm text-gray-300 mb-6">
//   //         Login to Smart Event Platform
//   //       </p>

//   //       {error && (
//   //         <p className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm text-center">
//   //           {error}
//   //         </p>
//   //       )}

//   //       <input
//   //         name="email"
//   //         value={form.email}
//   //         placeholder="Email"
//   //         onChange={handleChange}
//   //         className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//   //       />

//   //       <input
//   //         name="password"
//   //         type="password"
//   //         value={form.password}
//   //         placeholder="Password"
//   //         onChange={handleChange}
//   //         className="w-full p-3 mb-6 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
//   //       />

//   //       <button
//   //         disabled={loading}
//   //         className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold disabled:opacity-50"
//   //       >
//   //         {loading ? "Logging in..." : "Login"}
//   //       </button>
//   //     </form>
//   //   </div>
//   // );

//   return (
//     <>
//       <SunriseParticles />
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-100 via-yellow-50 to-orange-100 px-4">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-amber-200 shadow-2xl rounded-2xl p-8"
//         >
//           {/* HEADER */}
//           <div className="text-center mb-6">
//             <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
//               SE
//             </div>

//             <h2 className="text-3xl font-bold text-amber-900">Welcome Back</h2>

//             <p className="text-sm text-amber-700 mt-1">
//               Smart Event Platform Login
//             </p>
//           </div>

//           {/* ERROR */}
//           {error && (
//             <p className="bg-red-50 text-red-600 border border-red-200 p-2 rounded mb-4 text-sm text-center">
//               {error}
//             </p>
//           )}

//           {/* EMAIL */}
//           <input
//             name="email"
//             value={form.email}
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full p-3 mb-4 rounded-lg border border-amber-200 bg-white text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
//           />

//           {/* PASSWORD */}
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full p-3 mb-6 rounded-lg border border-amber-200 bg-white text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
//           />

//           {/* BUTTON */}
//           <button
//             disabled={loading}
//             className="w-full py-3 rounded-lg bg-linear-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white font-semibold shadow-lg transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </>
//   );

// }

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../stores/slices/authSlices";
import { loginUser } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";
import SunriseParticles from "../../components/background/SunriseParticles";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const res = await loginUser(form);
  //     console.log("API Response:", res);

  //     // Extract token and user payload fields based on your operational schema
  //     const token = res?.data?.accessToken || res?.accessToken || res?.token;
  //     const userProfile = res?.data?.user || res?.user;

  //     if (!token) {
  //       throw new Error("Invalid response format: Missing authorization access token");
  //     }

  //     // ✅ CRITICAL FIX: Save token data to disk so interceptors can authorize sub-requests
  //     localStorage.setItem("token", token);
  //     if (userProfile) {
  //       localStorage.setItem("user", JSON.stringify(userProfile));
  //     }

  //     // Sync state into global Redux store pipeline memory slice context
  //     dispatch(loginSuccess({
  //       user: userProfile,
  //       token: token
  //     }));

  //     // Navigate straight to the protected index root dashboard
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Authentication fault caught:", err);
  //     setError(
  //       err.response?.data?.message ||
  //       err.message ||
  //       "Login execution transaction failed"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 🛠️ Replace the handleSubmit function inside src/pages/auth/Login.jsx:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      console.log("API Response:", res);

      // 1. Target the exact property names returned directly by your server
      const token = res?.data?.accessToken;
      const userProfile = res?.data?.user;

      if (!token || !userProfile) {
        throw new Error(
          "Invalid response format: Missing profile data or access token properties.",
        );
      }

      // 2. Commit plain token strings to disk storage layout keys
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userProfile));

      // 3. ✅ FIX: Pass the raw server response straight down the Redux tree
      // This provides the accurate action.payload structure your slice expects
      dispatch(loginSuccess(res));

      // 4. Navigate straight to your primary protected root route dashboard
      navigate("/");
    } catch (err) {
      console.error("Authentication fault caught:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login execution transaction failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SunriseParticles />
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-100 via-yellow-50 to-orange-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-amber-200 shadow-2xl rounded-2xl p-8 transform transition duration-300 hover:shadow-amber-100/50"
        >
          {/* LOGO AND HEADER DISPLAY METRICS */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-md text-lg tracking-wider">
              SE
            </div>
            <h2 className="text-3xl font-bold text-amber-900">Welcome Back</h2>
            <p className="text-sm text-amber-700 mt-1">
              Smart Event & Conference Portal
            </p>
          </div>

          {/* ACTIVE ERROR ALERT BANNER */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r-lg mb-4 text-xs font-medium animate-fadeIn">
              <span className="font-bold">Access Denied:</span> {error}
            </div>
          )}

          {/* EMAIL FORM SELECTION ELEMENT */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 pl-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              placeholder="name@company.com"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-amber-200 bg-white text-amber-900 placeholder-amber-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
            />
          </div>

          {/* PASSWORD FORM SELECTION ELEMENT */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 pl-1">
              Account Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-amber-200 bg-white text-amber-900 placeholder-amber-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
            />
          </div>

          {/* TRANSACTION SUBMIT TRIGGER ACTION WIDGET */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 hover:opacity-95 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
          >
            {loading ? "Verifying Credentials..." : "Authenticate Session"}
          </button>
          <div className=" flex justify-center p-4 text-amber-400">
            <p>
              If dont have an account? {""}
              <Link
                to="/register"
                className="text-amber-400 font-semibold hover:underline align-middle"
              >
                Sign Up{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
