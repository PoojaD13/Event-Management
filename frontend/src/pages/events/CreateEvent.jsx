//works fine

import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../services/api"; // 📦 Central Axios Client
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiFileText,
  FiType,
  FiLayers,
  FiInfo,
} from "react-icons/fi";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const isEditMode = !!id;

  // Initialize React Hook Form with native validation management features
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      building: "",
      floor: "",
      roomNumber: "",
      coordinates: {
        lat: "",
        lng: "",
      },
    },
  });

  useEffect(() => {
    if (!isEditMode) return;

    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        const event = res?.data?.data;

        setValue("title", event.title);
        setValue("description", event.description);
        setValue("date", event.date?.split("T")[0]);
        setValue("startTime", event.startTime);
        setValue("endTime", event.endTime);
        setValue("building", event.building);
        setValue("floor", event.floor);
        setValue("roomNumber", event.roomNumber);
      } catch (err) {
        console.log("Failed to load event", err);
      }
    };

    fetchEvent();
  }, [id]);

  // this works fine before the mappImg

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   setServerError("");

  //   try {
  //     const userProfile = user?.data?.user || user?.user || user;
  //     const organizerId = userProfile?._id || userProfile?.id;

  //     const payload = {
  //       ...data,
  //       organizer: organizerId,
  //       date: new Date(data.date).toISOString(),
  //     };

  //     if (isEditMode) {
  //       await api.put(`/events/${id}`, payload);
  //       toast.success("Event updated successfully");
  //     } else {
  //       await api.post("/events", payload);
  //       toast.success("Event created successfully");
  //     }

  //     navigate("/events");
  //   } catch (err) {
  //     const errorMsg =
  //       err.response?.data?.message || err.message || "Operation failed";

  //     setServerError(errorMsg);
  //     toast.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const userProfile = user?.data?.user || user?.user || user;
      const organizerId = userProfile?._id || userProfile?.id;

      const payload = {
        ...data,
        organizer: organizerId,
        date: new Date(data.date).toISOString(),
      };

      let response;

      if (isEditMode) {
        response = await api.put(`/events/${id}`, payload);
        toast.success("Event updated successfully");
      } else {
        response = await api.post("/events", payload);
        toast.success("Event created successfully");
      }

      const result = response?.data?.data;

      console.log("EVENT RESULT:", result);

      // optional: navigate with state
      navigate("/events", {
        state: {
          qrImage: result?.qrImage,
          locImage: result?.locImage,
        },
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Operation failed";

      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl border border-slate-100 overflow-hidden">
        {/* BRAND MANAGEMENT TOP BLOCK HEADER */}
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-blue-900 p-6 text-white">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span>📅</span> Event Provisioning Wizard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Publish venue metrics to automatically configure client parameters
            and build secure check-in QR codes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-6"
        >
          {/* RUNTIME PIPELINE EXCEPTION MONITOR BANNER */}
          {serverError && (
            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-3.5 rounded-r-xl text-xs font-medium animate-fadeIn">
              <span className="font-bold">Execution Error:</span> {serverError}
            </div>
          )}
          {/* SECTION 1: CORE CATALOG METADATA */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <FiType /> Primary Information
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                Event Title
              </label>
              <input
                type="text"
                placeholder="e.g., Global AI & Machine Learning Summit 2026"
                {...register("title", {
                  required: "Event title string is mandatory",
                })}
                className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.title
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />
              {errors.title && (
                <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                  ⚠️ {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                Description Abstract
              </label>
              <textarea
                rows="3"
                placeholder="Compile full agenda metrics, operational constraints, or target track definitions..."
                {...register("description", {
                  required: "Description summary context is required",
                })}
                className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.description
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />
              {errors.description && (
                <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                  ⚠️ {errors.description.message}
                </p>
              )}
            </div>
          </div>
          {/* SECTION 2: TIMELINE TIMESTAMPS OVERRIDES */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <FiCalendar /> Schedule Metrics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                  Execution Date
                </label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Target run calendar date is mandatory",
                  })}
                  className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-700 focus:outline-none focus:ring-2 transition ${
                    errors.date
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.date && (
                  <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                    ⚠️ {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                  Start Time (24h)
                </label>
                <input
                  type="time"
                  {...register("startTime", {
                    required: "Start timestamp parameter required",
                  })}
                  className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-700 focus:outline-none focus:ring-2 transition ${
                    errors.startTime
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.startTime && (
                  <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                    ⚠️ {errors.startTime.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                  End Time (24h)
                </label>
                <input
                  type="time"
                  {...register("endTime", {
                    required: "End timestamp constraint required",
                  })}
                  className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-700 focus:outline-none focus:ring-2 transition ${
                    errors.endTime
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.endTime && (
                  <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                    ⚠️ {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* SECTION 3: CORPORATE GEOGRAPHY VENUE MAPS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <FiMapPin /> Venue Allocations
            </h3>
            {/* added the lat and log input*/}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g., 12.9716"
                  {...register("coordinates.lat", {
                    required: "Latitude is required",
                    valueAsNumber: true,
                  })}
                  className="w-full p-3 rounded-xl border text-sm bg-slate-50/50"
                />
                {errors?.coordinates?.lat && (
                  <p className="text-rose-500 text-[11px] mt-1">
                    ⚠️ {errors.coordinates.lat.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g., 77.5946"
                  {...register("coordinates.lng", {
                    required: "Longitude is required",
                    valueAsNumber: true,
                  })}
                  className="w-full p-3 rounded-xl border text-sm bg-slate-50/50"
                />
                {errors?.coordinates?.lng && (
                  <p className="text-rose-500 text-[11px] mt-1">
                    ⚠️ {errors.coordinates.lng.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                  Corporate Building
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tech Park Block C"
                  {...register("building", {
                    required: "Building name string required",
                  })}
                  className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                    errors.building
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.building && (
                  <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                    ⚠️ {errors.building.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                  Floor Level
                </label>
                <input
                  type="text"
                  placeholder="e.g., 5"
                  {...register("floor", {
                    required: "Floor indicator string required",
                  })}
                  className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                    errors.floor
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.floor && (
                  <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                    ⚠️ {errors.floor.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                  Room Designation
                </label>
                <input
                  type="text"
                  placeholder="e.g., Conference Hall A-5"
                  {...register("roomNumber", {
                    required: "Room identifier name required",
                  })}
                  className={`w-full p-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                    errors.roomNumber
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                {errors.roomNumber && (
                  <p className="text-rose-500 text-[11px] font-medium mt-1.5 pl-1">
                    ⚠️ {errors.roomNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* USER INTERACTION FOOTER CONTROL STRIP BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/events")}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 transition active:scale-[0.99] disabled:opacity-40"
            >
              Abuse / Cancel Wizard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/10 active:scale-[0.99] disabled:opacity-50"
            >
              {/* {loading ? "Compiling Document..." : "Commit and Publish"} */}
              {loading
                ? "Processing..."
                : isEditMode
                  ? "Update Event"
                  : "Commit and Publish"}
            </button>
          </div>
          Socket.IO Chat System module layout
        </form>
      </div>
    </div>
  );
}
