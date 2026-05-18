// // // import { useState } from "react";
// // // import { registerUser } from "../../services/auth.api";
// // // import { useNavigate } from "react-router-dom";

// // // export default function Register() {
// // //   const navigate = useNavigate();

// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     email: "",
// // //     password: "",
// // //     role: "participant",
// // //   });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       await registerUser(form);
// // //       navigate("/login");
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Register failed");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center h-screen bg-gray-100">
// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="bg-white p-8 rounded-xl shadow-md w-96"
// // //       >
// // //         <h2 className="text-2xl font-bold mb-6">Register</h2>

// // //         <input
// // //           placeholder="Name"
// // //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// // //           className="w-full p-2 border mb-4"
// // //         />

// // //         <input
// // //           placeholder="Email"
// // //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// // //           className="w-full p-2 border mb-4"
// // //         />

// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           onChange={(e) => setForm({ ...form, password: e.target.value })}
// // //           className="w-full p-2 border mb-4"
// // //         />

// // //         <select
// // //           onChange={(e) => setForm({ ...form, role: e.target.value })}
// // //           className="w-full p-2 border mb-4"
// // //         >
// // //           <option value="participant">Participant</option>
// // //           <option value="organizer">Organizer</option>
// // //           <option value="admin">Admin</option>
// // //         </select>

// // //         <button className="w-full bg-green-600 text-white p-2 rounded">
// // //           Register
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // import { useState } from "react";
// // import { registerUser } from "../../services/auth.api";
// // import { useNavigate } from "react-router-dom";

// // export default function Register() {
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     role: "participant",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       if (!form.name || !form.email || !form.password) {
// //         throw new Error("All fields are required");
// //       }

// //       await registerUser(form);

// //       navigate("/login");
// //     } catch (err) {
// //       console.log(err);

// //       setError(err.response?.data?.message || err.message || "Register failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // return (
// //   //   <div className="flex items-center justify-center h-screen bg-gray-100">
// //   //     <form
// //   //       onSubmit={handleSubmit}
// //   //       className="bg-white p-8 rounded-xl shadow-md w-96"
// //   //     >
// //   //       <h2 className="text-2xl font-bold mb-6">Register</h2>

// //   //       {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

// //   //       <input
// //   //         name="name"
// //   //         value={form.name}
// //   //         placeholder="Name"
// //   //         onChange={handleChange}
// //   //         className="w-full p-2 border mb-4"
// //   //       />

// //   //       <input
// //   //         name="email"
// //   //         value={form.email}
// //   //         placeholder="Email"
// //   //         onChange={handleChange}
// //   //         className="w-full p-2 border mb-4"
// //   //       />

// //   //       <input
// //   //         name="password"
// //   //         type="password"
// //   //         value={form.password}
// //   //         placeholder="Password"
// //   //         onChange={handleChange}
// //   //         className="w-full p-2 border mb-4"
// //   //       />

// //   //       <select
// //   //         name="role"
// //   //         value={form.role}
// //   //         onChange={handleChange}
// //   //         className="w-full p-2 border mb-4"
// //   //       >
// //   //         <option value="participant">Participant</option>
// //   //         <option value="organizer">Organizer</option>
// //   //         <option value="admin">Admin</option>
// //   //       </select>

// //   //       <button
// //   //         disabled={loading}
// //   //         className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
// //   //       >
// //   //         {loading ? "Creating account..." : "Register"}
// //   //       </button>
// //   //     </form>
// //   //   </div>
// //   // );
// //   return (

// //     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white"
// //       >
// //         <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>

// //         <p className="text-center text-sm text-gray-300 mb-6">
// //           Join Smart Event Platform
// //         </p>

// //         {error && (
// //           <p className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm text-center">
// //             {error}
// //           </p>
// //         )}

// //         <input
// //           name="name"
// //           value={form.name}
// //           placeholder="Full Name"
// //           onChange={handleChange}
// //           className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
// //         />

// //         <input
// //           name="email"
// //           value={form.email}
// //           placeholder="Email"
// //           onChange={handleChange}
// //           className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
// //         />

// //         <input
// //           name="password"
// //           type="password"
// //           value={form.password}
// //           placeholder="Password"
// //           onChange={handleChange}
// //           className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
// //         />

// //         <select
// //           name="role"
// //           value={form.role}
// //           onChange={handleChange}
// //           className="w-full p-3 mb-6 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
// //         >
// //           <option value="participant">Participant</option>
// //           <option value="organizer">Organizer</option>
// //           <option value="admin">Admin</option>
// //         </select>

// //         <button
// //           disabled={loading}
// //           className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold disabled:opacity-50"
// //         >
// //           {loading ? "Creating account..." : "Register"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { registerUser } from "../../services/auth.api";
// import { useNavigate } from "react-router-dom";
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
//         throw new Error("All fields are required");
//       }

//       await registerUser(form);

//       toast.success("Account created successfully");
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//       const msg =
//         err.response?.data?.message || err.message || "Register failed";

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
//         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white"
//       >
//         {/* BRAND HEADER */}
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-green-600 flex items-center justify-center font-bold text-white">
//             SE
//           </div>
//           <h1 className="text-xl font-bold">Smart Event Platform</h1>
//           <p className="text-xs text-gray-300">Event • QR • Chat System</p>
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>

//         <p className="text-center text-sm text-gray-300 mb-6">
//           Join Smart Event Platform
//         </p>

//         {error && (
//           <p className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm text-center">
//             {error}
//           </p>
//         )}

//         {/* NAME */}
//         <input
//           name="name"
//           value={form.name}
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />

//         {/* EMAIL */}
//         <input
//           name="email"
//           value={form.email}
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />

//         {/* PASSWORD + SHOW/HIDE */}
//         <div className="relative mb-2">
//           <input
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={form.password}
//             placeholder="Password"
//             onChange={(e) => {
//               handleChange(e);
//               setStrength(checkStrength(e.target.value));
//             }}
//             className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 text-xs text-gray-300"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         {/* PASSWORD STRENGTH */}
//         {form.password && (
//           <p
//             className={`text-xs mb-4 ${
//               strength === "Weak"
//                 ? "text-red-400"
//                 : strength === "Medium"
//                   ? "text-yellow-400"
//                   : "text-green-400"
//             }`}
//           >
//             Strength: {strength}
//           </p>
//         )}

//         {/* ROLE */}
//         {/* <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full p-3 mb-6 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           <option value="participant">Participant</option>
//           <option value="organizer">Organizer</option>
//           <option value="admin">Admin</option>
//         </select> */}

//         {/* BUTTON */}
//         {/* <button
//           disabled={loading}
//           className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold disabled:opacity-50"
//         >
//           {loading ? "Creating account..." : "Register"}
//         </button> */}

//         <div className="relative mb-6">
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="w-full p-3 pr-10 rounded-lg bg-white/10 border border-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option className="text-black" value="participant">
//               Participant
//             </option>
//             <option className="text-black" value="organizer">
//               Organizer
//             </option>
//             <option className="text-black" value="admin">
//               Admin
//             </option>
//           </select>

//           {/* custom arrow */}
//           <div className="absolute right-3 top-3 pointer-events-none text-gray-300">
//             ▼
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }



import { useState } from "react";
import { registerUser } from "../../services/auth.api";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const checkStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!form.name || !form.email || !form.password) {
        throw new Error("All registration form data inputs are required");
      }
      
      await registerUser(form);
      toast.success("Account created successfully! Please authenticate your session.");
      navigate("/login");
    } catch (err) {
      console.error("Registration transaction pipeline failed:", err);
      const msg = err.response?.data?.message || err.message || "Registration sequence failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white transition duration-300"
      >
        {/* BRAND HEADER */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-lg tracking-wider shadow-md shadow-emerald-700/30">
            SE
          </div>
          <h1 className="text-xl font-bold tracking-wide">Smart Event Platform</h1>
          <p className="text-xs text-gray-300 font-medium">Event • QR • Chat Engine</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">Create Account</h2>
        <p className="text-center text-xs text-gray-300 mb-6">Join Smart Event Platform Hub</p>

        {/* ACTIVE RUNTIME COMPILER ERRORS */}
        {error && (
          <p className="bg-red-500/20 text-red-200 border border-red-500/30 p-2.5 rounded-lg mb-4 text-xs text-center font-medium animate-fadeIn">
            {error}
          </p>
        )}

        {/* NAME INPUT */}
        <div className="mb-4">
          <input 
            name="name" 
            required
            value={form.name} 
            placeholder="Full Name" 
            onChange={handleChange} 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition" 
          />
        </div>

        {/* EMAIL INPUT */}
        <div className="mb-4">
          <input 
            type="email"
            name="email" 
            required
            value={form.email} 
            placeholder="Email Address" 
            onChange={handleChange} 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition" 
          />
        </div>

        {/* PASSWORD + SHOW/HIDE VIEWPORT CONTROL */}
        <div className="relative mb-2">
          <input 
            name="password" 
            required
            type={showPassword ? "text" : "password"} 
            value={form.password} 
            placeholder="Password" 
            onChange={(e) => { 
              handleChange(e); 
              setStrength(checkStrength(e.target.value)); 
            }} 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 pr-12 transition" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-3.5 text-[10px] uppercase font-bold tracking-wider text-gray-300 hover:text-white transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* PASSWORD STRENGTH COMPLEXITY ANALYZER METRIC */}
        {form.password && (
          <p className={`text-[11px] font-medium mb-4 pl-1 ${ 
            strength === "Weak" ? "text-rose-400" : 
            strength === "Medium" ? "text-amber-400" : 
            "text-emerald-400" 
          }`}>
            Complexity: <span className="font-bold underline uppercase tracking-wide">{strength}</span>
          </p>
        )}

        {/* PROFILE ROLE TYPE IDENTIFICATION SELECTOR */}
        <div className="relative mb-6">
          <select 
            name="role" 
            value={form.role} 
            onChange={handleChange} 
            className="w-full p-3 pr-10 rounded-lg bg-white/10 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition"
          >
            <option className="text-slate-900 bg-white" value="participant">Participant Profile</option>
            <option className="text-slate-900 bg-white" value="organizer">Organizer Profile</option>
            <option className="text-slate-900 bg-white" value="admin">Administrator Profile</option>
          </select>
          <div className="absolute right-4 top-4 pointer-events-none text-xs text-gray-300">
            ▼
          </div>
        </div>

        {/* TRANSACTION ACTION RESTRUCTURING EXECUTOR */}
        <button 
          type="submit"
          disabled={loading} 
          className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-lg shadow-emerald-950/20 text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* COMPONENT LINKS CROSS NAVIGATION REDIRECT */}
        <p className="text-center text-xs text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
