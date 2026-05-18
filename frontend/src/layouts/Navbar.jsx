// import { useDispatch } from "react-redux";
// import { logout } from "../../stores/slices/authSlices";
// import { useNavigate } from "react-router-dom";

// export default function Navbar({ user }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      
//       <h2 className="font-semibold text-gray-700">
//         Welcome, {user?.name}
//       </h2>

//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../stores/slices/authSlices";
// import { logout } from "../../stores/slices/authSlices";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold font-mono px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">
          Node: Active
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* User Workspace Profile Layout Info */}
        <div className="flex items-center gap-2.5 text-right">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{user?.name || "User Profile"}</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mt-0.5">
              {user?.role || "Participant"}
            </p>
          </div>
          
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center uppercase text-sm shadow-sm shadow-blue-500/20">
            {user?.name ? String(user.name).charAt(0) : <FiUser />}
          </div>
        </div>

        {/* Quick Session Disconnect utility component trigger button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition text-lg"
          title="Sign Out Session"
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  );
}
