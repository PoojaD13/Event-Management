// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// export default function OrganizerPanel() {
//   const [activeTab, setActiveTab] = useState("participants");

//   const [participants, setParticipants] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);

//   const [volunteerName, setVolunteerName] = useState("");
//   const [volunteerEmail, setVolunteerEmail] = useState("");
//   const [volunteerPhone, setVolunteerPhone] = useState("");

//   // EDIT STATES
//   const [editId, setEditId] = useState(null);

//   const [editData, setEditData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const { id: eventId } = useParams();

//   // =====================
//   // FETCH PARTICIPANTS
//   // =====================
//   const fetchParticipants = async () => {
//     try {
//       const res = await api.get(`/participant/${eventId}`);
//       setParticipants(res?.data?.data || []);
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to load participants");
//     }
//   };

//   // =====================
//   // FETCH VOLUNTEERS
//   // =====================
//   const fetchVolunteers = async () => {
//     try {
//       const res = await api.get(`/volunteers/event/${eventId}`);
//       setVolunteers(res?.data?.data || []);
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to load volunteers");
//     }
//   };

//   // =====================
//   // INIT LOAD
//   // =====================
//   useEffect(() => {
//     if (!eventId) return;

//     fetchParticipants();
//     fetchVolunteers();
//   }, [eventId]);

//   // =====================
//   // ADD VOLUNTEER
//   // =====================
//   const addVolunteer = async () => {
//     try {
//       setLoading(true);

//       await api.post("/volunteers", {
//         name: volunteerName,
//         email: volunteerEmail,
//         phone: volunteerPhone,
//         eventId,
//       });

//       toast.success("Volunteer added successfully");

//       setVolunteerName("");
//       setVolunteerEmail("");
//       setVolunteerPhone("");

//       fetchVolunteers();
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to add volunteer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================
//   // OPEN EDIT
//   // =====================
//   const openEdit = (volunteer) => {
//     setEditId(volunteer._id);

//     setEditData({
//       name: volunteer.name || "",
//       email: volunteer.email || "",
//       phone: volunteer.phone || "",
//     });
//   };

//   // =====================
//   // UPDATE VOLUNTEER
//   // =====================
//   const updateVolunteer = async () => {
//     try {
//       await api.put(`/volunteers/${editId}`, editData);

//       toast.success("Volunteer updated");

//       setEditId(null);

//       fetchVolunteers();
//     } catch (err) {
//       console.log(err);
//       toast.error("Update failed");
//     }
//   };

//   // =====================
//   // DELETE VOLUNTEER
//   // =====================
//   const deleteVolunteer = async (id) => {
//     try {
//       await api.delete(`/volunteers/${id}`);

//       toast.success("Volunteer deleted");

//       fetchVolunteers();
//     } catch (err) {
//       console.log(err);
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100 mt-6">
//       {/* ================= TABS ================= */}
//       <div className="flex gap-2 mb-4">
//         <button
//           onClick={() => setActiveTab("participants")}
//           className={`px-3 py-1 text-xs rounded-xl font-bold ${
//             activeTab === "participants"
//               ? "bg-blue-600 text-white"
//               : "bg-slate-200 text-slate-700"
//           }`}
//         >
//           Participants
//         </button>

//         <button
//           onClick={() => setActiveTab("volunteers")}
//           className={`px-3 py-1 text-xs rounded-xl font-bold ${
//             activeTab === "volunteers"
//               ? "bg-blue-600 text-white"
//               : "bg-slate-200 text-slate-700"
//           }`}
//         >
//           Volunteers
//         </button>

//         <button
//           onClick={() => setActiveTab("add")}
//           className={`px-3 py-1 text-xs rounded-xl font-bold ${
//             activeTab === "add"
//               ? "bg-blue-600 text-white"
//               : "bg-slate-200 text-slate-700"
//           }`}
//         >
//           Add Volunteer
//         </button>
//       </div>

//       {/* ================= PARTICIPANTS ================= */}
//       {activeTab === "participants" && (
//         <div className="space-y-2 max-h-60 overflow-y-auto">
//           {participants.length === 0 ? (
//             <p className="text-xs text-slate-400">
//               No participants yet
//             </p>
//           ) : (
//             participants.map((p, i) => (
//               <div
//                 key={i}
//                 className="p-2 border rounded text-xs bg-slate-50"
//               >
//                 {p.userId?.name || "Unknown User"}
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* ================= VOLUNTEERS ================= */}
//       {activeTab === "volunteers" && (
//         <div className="space-y-2 max-h-60 overflow-y-auto">

//           {volunteers.length === 0 ? (
//             <p className="text-xs text-slate-400">
//               No volunteers yet
//             </p>
//           ) : (
//             volunteers.map((v) => (
//               <div
//                 key={v._id}
//                 className="p-3 border rounded bg-slate-50 flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-semibold text-sm">
//                     {v.name}
//                   </p>

//                   <p className="text-xs text-slate-500">
//                     {v.email}
//                   </p>

//                   <p className="text-xs text-slate-500">
//                     {v.phone}
//                   </p>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => openEdit(v)}
//                     className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deleteVolunteer(v._id)}
//                     className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* ================= ADD VOLUNTEER ================= */}
//       {activeTab === "add" && (
//         <div className="space-y-2">
//           <input
//             value={volunteerName}
//             onChange={(e) => setVolunteerName(e.target.value)}
//             placeholder="Name"
//             className="w-full p-2 border rounded text-xs"
//           />

//           <input
//             value={volunteerEmail}
//             onChange={(e) => setVolunteerEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full p-2 border rounded text-xs"
//           />

//           <input
//             value={volunteerPhone}
//             onChange={(e) => setVolunteerPhone(e.target.value)}
//             placeholder="Phone"
//             className="w-full p-2 border rounded text-xs"
//           />

//           <button
//             onClick={addVolunteer}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-xs font-bold"
//           >
//             {loading ? "Adding..." : "Add Volunteer"}
//           </button>
//         </div>
//       )}

//       {/* ================= EDIT MODAL ================= */}
//       {editId && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//           <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-3">

//             <h2 className="font-bold text-lg">
//               Edit Volunteer
//             </h2>

//             <input
//               value={editData.name}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   name: e.target.value,
//                 })
//               }
//               placeholder="Name"
//               className="w-full p-2 border rounded text-sm"
//             />

//             <input
//               value={editData.email}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   email: e.target.value,
//                 })
//               }
//               placeholder="Email"
//               className="w-full p-2 border rounded text-sm"
//             />

//             <input
//               value={editData.phone}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   phone: e.target.value,
//                 })
//               }
//               placeholder="Phone"
//               className="w-full p-2 border rounded text-sm"
//             />

//             <div className="flex gap-2 justify-end">

//               <button
//                 onClick={() => setEditId(null)}
//                 className="px-3 py-2 bg-slate-300 rounded text-sm"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={updateVolunteer}
//                 className="px-3 py-2 bg-green-600 text-white rounded text-sm"
//               >
//                 Save
//               </button>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// Test

import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function OrganizerPanel() {
  const [activeTab, setActiveTab] = useState("participants");

  const [participants, setParticipants] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPhone, setVolunteerPhone] = useState("");

  // EDIT STATES
  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const { id: eventId } = useParams();

  // =====================
  // FETCH PARTICIPANTS
  // =====================
  const fetchParticipants = async () => {
    try {
      const res = await api.get(`/participant/${eventId}`);
      setParticipants(res?.data?.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load participants");
    }
  };

  // =====================
  // FETCH VOLUNTEERS
  // =====================
  const fetchVolunteers = async () => {
    try {
      const res = await api.get(`/volunteers/event/${eventId}`);
      setVolunteers(res?.data?.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load volunteers");
    }
  };

  // =====================
  // INIT LOAD
  // =====================
  useEffect(() => {
    if (!eventId) return;

    fetchParticipants();
    fetchVolunteers();
  }, [eventId]);

  // =====================
  // ADD VOLUNTEER
  // =====================
  const addVolunteer = async () => {
    try {
      setLoading(true);

      await api.post("/volunteers", {
        name: volunteerName,
        email: volunteerEmail,
        phone: volunteerPhone,
        eventId,
      });

      toast.success("Volunteer added successfully");

      setVolunteerName("");
      setVolunteerEmail("");
      setVolunteerPhone("");

      fetchVolunteers();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add volunteer");
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // OPEN EDIT
  // =====================
  const openEdit = (volunteer) => {
    setEditId(volunteer._id);

    setEditData({
      name: volunteer.name || "",
      email: volunteer.email || "",
      phone: volunteer.phone || "",
    });
  };

  // =====================
  // UPDATE VOLUNTEER
  // =====================
  const updateVolunteer = async () => {
    try {
      await api.put(`/volunteers/${editId}`, editData);

      toast.success("Volunteer updated");

      setEditId(null);

      fetchVolunteers();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  // =====================
  // DELETE VOLUNTEER
  // =====================
  const deleteVolunteer = async (id) => {
    try {
      await api.delete(`/volunteers/${id}`);

      toast.success("Volunteer deleted");

      fetchVolunteers();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-500 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl mt-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Organizer Control Panel
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Manage participants and volunteers
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("participants")}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "participants"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Participants
          </button>

          <button
            onClick={() => setActiveTab("volunteers")}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "volunteers"
                ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Volunteers
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "add"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Add Volunteer
          </button>
        </div>

        {/* ================= PARTICIPANTS ================= */}
        {activeTab === "participants" && (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {participants.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                <p className="text-slate-500 text-sm">No participants yet</p>
              </div>
            ) : (
              participants.map((p, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">
                        {p.userId?.name || "Unknown User"}
                      </p>

                      <p className="text-slate-400 text-xs mt-1">
                        Event Participant
                      </p>
                    </div>

                    <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                      {p.userId?.name?.charAt(0) || "U"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= VOLUNTEERS ================= */}
        {activeTab === "volunteers" && (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {volunteers.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                <p className="text-slate-500 text-sm">No volunteers yet</p>
              </div>
            ) : (
              volunteers.map((v) => (
                <div
                  key={v._id}
                  className="bg-slate-900 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 rounded-2xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 font-bold text-lg">
                        {v.name?.charAt(0)}
                      </div>

                      <div>
                        <p className="text-white font-semibold text-sm">
                          {v.name}
                        </p>

                        <p className="text-slate-400 text-xs">{v.email}</p>

                        <p className="text-slate-500 text-xs mt-1">{v.phone}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(v)}
                        className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold transition-all"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteVolunteer(v._id)}
                        className="px-3 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-semibold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= ADD VOLUNTEER ================= */}
        {activeTab === "add" && (
          <div className="flex justify-center items-center w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 max-w-xl ">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Volunteer Name
                </label>

                <input
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  placeholder="Enter volunteer name"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-2xl px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Email Address
                </label>

                <input
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-2xl px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Phone Number
                </label>

                <input
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-2xl px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <button
                onClick={addVolunteer}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 transition-all text-white font-bold py-3 rounded-2xl shadow-lg shadow-emerald-500/20"
              >
                {loading ? "Adding Volunteer..." : "Add Volunteer"}
              </button>
            </div>
          </div>
        )}

        {/* ================= EDIT MODAL ================= */}
        {editId && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-[420px] shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-5">
                Edit Volunteer
              </h2>

              <div className="space-y-4">
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white outline-none"
                />

                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white outline-none"
                />

                <input
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={updateVolunteer}
                  className="px-4 py-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
