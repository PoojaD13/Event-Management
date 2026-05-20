// // works fine

// import { useState } from "react";
// import { registerUser } from "../../services/auth.api";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "participant",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [strength, setStrength] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const checkStrength = (password) => {
//     if (!password) return "";
//     if (password.length < 6) return "Weak";
//     if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
//     return "Medium";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (!form.name || !form.email || !form.password) {
//         throw new Error("All registration form data inputs are required");
//       }

//       await registerUser(form);
//       toast.success("Account created successfully! Please authenticate your session.");
//       navigate("/login");
//     } catch (err) {
//       console.error("Registration transaction pipeline failed:", err);
//       const msg = err.response?.data?.message || err.message || "Registration sequence failed";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white transition duration-300"
//       >
//         {/* BRAND HEADER */}
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-lg tracking-wider shadow-md shadow-emerald-700/30">
//             SE
//           </div>
//           <h1 className="text-xl font-bold tracking-wide">Smart Event Platform</h1>
//           <p className="text-xs text-gray-300 font-medium">Event • QR • Chat Engine</p>
//         </div>

//         <h2 className="text-2xl font-bold text-center mb-1">Create Account</h2>
//         <p className="text-center text-xs text-gray-300 mb-6">Join Smart Event Platform Hub</p>

//         {/* ACTIVE RUNTIME COMPILER ERRORS */}
//         {error && (
//           <p className="bg-red-500/20 text-red-200 border border-red-500/30 p-2.5 rounded-lg mb-4 text-xs text-center font-medium animate-fadeIn">
//             {error}
//           </p>
//         )}

//         {/* NAME INPUT */}
//         <div className="mb-4">
//           <input
//             name="name"
//             required
//             value={form.name}
//             placeholder="Full Name"
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition"
//           />
//         </div>

//         {/* EMAIL INPUT */}
//         <div className="mb-4">
//           <input
//             type="email"
//             name="email"
//             required
//             value={form.email}
//             placeholder="Email Address"
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition"
//           />
//         </div>

//         {/* PASSWORD + SHOW/HIDE VIEWPORT CONTROL */}
//         <div className="relative mb-2">
//           <input
//             name="password"
//             required
//             type={showPassword ? "text" : "password"}
//             value={form.password}
//             placeholder="Password"
//             onChange={(e) => {
//               handleChange(e);
//               setStrength(checkStrength(e.target.value));
//             }}
//             className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 pr-12 transition"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3.5 text-[10px] uppercase font-bold tracking-wider text-gray-300 hover:text-white transition"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         {/* PASSWORD STRENGTH COMPLEXITY ANALYZER METRIC */}
//         {form.password && (
//           <p className={`text-[11px] font-medium mb-4 pl-1 ${
//             strength === "Weak" ? "text-rose-400" :
//             strength === "Medium" ? "text-amber-400" :
//             "text-emerald-400"
//           }`}>
//             Complexity: <span className="font-bold underline uppercase tracking-wide">{strength}</span>
//           </p>
//         )}

//         {/* PROFILE ROLE TYPE IDENTIFICATION SELECTOR */}
//         <div className="relative mb-6">
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="w-full p-3 pr-10 rounded-lg bg-white/10 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition"
//           >
//             <option className="text-slate-900 bg-white" value="participant">Participant Profile</option>
//             <option className="text-slate-900 bg-white" value="organizer">Organizer Profile</option>
//             <option className="text-slate-900 bg-white" value="admin">Administrator Profile</option>
//           </select>
//           <div className="absolute right-4 top-4 pointer-events-none text-xs text-gray-300">
//             ▼
//           </div>
//         </div>

//         {/* TRANSACTION ACTION RESTRUCTURING EXECUTOR */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-lg shadow-emerald-950/20 text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
//         >
//           {loading ? "Creating Account..." : "Create Account"}
//         </button>

//         {/* COMPONENT LINKS CROSS NAVIGATION REDIRECT */}
//         <p className="text-center text-xs text-gray-300 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-emerald-400 font-bold hover:underline">
//             Login here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// testing the opt
// import { useState } from "react";
// import { registerUser, verifyOtp } from "../../services/auth.api";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "participant",
//   });
//   const [otp, setOtp] = useState(""); // OTP input
//   const [step, setStep] = useState(1); // 1 = registration, 2 = verify OTP
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [strength, setStrength] = useState("");
//   const [userId, setUserId] = useState(""); // store userId from registration response

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleOtpChange = (e) => setOtp(e.target.value);

//   const checkStrength = (password) => {
//     if (!password) return "";
//     if (password.length < 6) return "Weak";
//     if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
//     return "Medium";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (!form.name || !form.email || !form.password) {
//         throw new Error("All registration form data inputs are required");
//       }

//       const res = await registerUser(form);
//       setUserId(res.userId); // save userId for OTP
//       setStep(2); // move to OTP step
//       toast.success("OTP sent to your email. Please verify.");
//     } catch (err) {
//       console.error(err);
//       const msg =
//         err.response?.data?.message || err.message || "Registration failed";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await verifyOtp({ userId, otp });
//       toast.success("Email verified successfully! You can now login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       const msg =
//         err.response?.data?.message || err.message || "OTP verification failed";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 px-4">
//       <form
//         onSubmit={step === 1 ? handleSubmit : handleVerifyOtp}
//         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white transition duration-300"
//       >
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-lg tracking-wider shadow-md shadow-emerald-700/30">
//             SE
//           </div>
//           <h1 className="text-xl font-bold tracking-wide">
//             Smart Event Platform
//           </h1>
//         </div>

//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold text-center mb-1">
//               Create Account
//             </h2>
//             <p className="text-center text-xs text-gray-300 mb-6">
//               Join Smart Event Platform Hub
//             </p>

//             {error && (
//               <p className="bg-red-500/20 text-red-200 border border-red-500/30 p-2.5 rounded-lg mb-4 text-xs text-center font-medium animate-fadeIn">
//                 {error}
//               </p>
//             )}

//             {/* Name, Email, Password, Role Inputs (same as before) */}
//             <div className="mb-4">
//               <input
//                 name="name"
//                 required
//                 value={form.name}
//                 placeholder="Full Name"
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={form.email}
//                 placeholder="Email Address"
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition"
//               />
//             </div>
//             <div className="relative mb-2">
//               <input
//                 name="password"
//                 required
//                 type={showPassword ? "text" : "password"}
//                 value={form.password}
//                 placeholder="Password"
//                 onChange={(e) => {
//                   handleChange(e);
//                   setStrength(checkStrength(e.target.value));
//                 }}
//                 className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 pr-12 transition"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3.5 text-[10px] uppercase font-bold tracking-wider text-gray-300 hover:text-white transition"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//             {form.password && (
//               <p
//                 className={`text-[11px] font-medium mb-4 pl-1 ${strength === "Weak" ? "text-rose-400" : strength === "Medium" ? "text-amber-400" : "text-emerald-400"}`}
//               >
//                 Complexity:{" "}
//                 <span className="font-bold underline uppercase tracking-wide">
//                   {strength}
//                 </span>
//               </p>
//             )}
//             <div className="relative mb-6">
//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full p-3 pr-10 rounded-lg bg-white/10 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition"
//               >
//                 <option className="text-slate-900 bg-white" value="participant">
//                   Participant Profile
//                 </option>
//                 <option className="text-slate-900 bg-white" value="organizer">
//                   Organizer Profile
//                 </option>
//                 <option className="text-slate-900 bg-white" value="admin">
//                   Administrator Profile
//                 </option>
//               </select>
//               <div className="absolute right-4 top-4 pointer-events-none text-xs text-gray-300">
//                 ▼
//               </div>
//             </div>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <h2 className="text-2xl font-bold text-center mb-1">Verify OTP</h2>
//             <p className="text-center text-xs text-gray-300 mb-6">
//               Enter the OTP sent to your email
//             </p>
//             {error && (
//               <p className="bg-red-500/20 text-red-200 border border-red-500/30 p-2.5 rounded-lg mb-4 text-xs text-center font-medium animate-fadeIn">
//                 {error}
//               </p>
//             )}
//             <div className="mb-4">
//               <input
//                 name="otp"
//                 value={otp}
//                 onChange={handleOtpChange}
//                 placeholder="Enter OTP"
//                 className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition"
//               />
//             </div>
//           </>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-lg shadow-emerald-950/20 text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
//         >
//           {loading
//             ? step === 1
//               ? "Creating Account..."
//               : "Verifying OTP..."
//             : step === 1
//               ? "Create Account"
//               : "Verify OTP"}
//         </button>

//         {step === 1 && (
//           <p className="text-center text-xs text-gray-300 mt-4">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-emerald-400 font-bold hover:underline"
//             >
//               Login here
//             </Link>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { registerUser, verifyOtp } from "../../services/auth.api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "participant",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const checkStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  // REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!form.name || !form.email || !form.password) {
        throw new Error("All registration form data inputs are required");
      }

      await registerUser(form);

      // IMPORTANT: store email for OTP step
      setEmailForOtp(form.email);

      setStep(2);
      toast.success("OTP sent to your email. Please verify.");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // OTP VERIFY
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!emailForOtp || !otp) {
        throw new Error("Email and OTP are required");
      }

      // Send BOTH email + OTP
      await verifyOtp({
        email: emailForOtp,
        otp: otp,
      });

      toast.success("Email verified successfully!");
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "OTP verification failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 px-4">
      <form
        onSubmit={step === 1 ? handleSubmit : handleVerifyOtp}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-emerald-600 flex items-center justify-center font-bold">
            SE
          </div>
          <h1 className="text-xl font-bold">Smart Event Platform</h1>
        </div>

        {/* STEP 1: REGISTER */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            {error && (
              <p className="bg-red-500/20 text-red-200 p-2 rounded mt-3 text-sm text-center">
                {error}
              </p>
            )}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 mt-4 rounded bg-white/10"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 mt-3 rounded bg-white/10"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={(e) => {
                handleChange(e);
                setStrength(checkStrength(e.target.value));
              }}
              placeholder="Password"
              className="w-full p-3 mt-3 rounded bg-white/10"
            />

            {form.password && (
              <p className="text-xs mt-1">
                Strength: <b>{strength}</b>
              </p>
            )}

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 mt-3 rounded bg-white/10"
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center">Verify OTP</h2>

            <p className="text-center text-sm text-gray-300 mt-2">
              OTP sent to:
              <br />
              <span className="text-emerald-400 font-semibold">
                {emailForOtp}
              </span>
            </p>

            {error && (
              <p className="bg-red-500/20 text-red-200 p-2 rounded mt-3 text-sm text-center">
                {error}
              </p>
            )}

            <input
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="w-full p-3 mt-4 rounded bg-white/10 text-center tracking-widest"
            />
          </>
        )}

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full mt-5 p-3 bg-emerald-600 rounded font-bold"
        >
          {loading
            ? step === 1
              ? "Creating Account..."
              : "Verifying..."
            : step === 1
            ? "Create Account"
            : "Verify OTP"}
        </button>

        {step === 1 && (
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400">
              Login
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}