// import { FiMapPin } from "react-icons/fi";

// export default function NavigateButton({ coordinates }) {
//   const handleNavigation = () => {
//     if (!coordinates?.lat || !coordinates?.lng) {
//       alert("Event coordinates not available.");
//       return;
//     }

//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by this browser.");
//       return;
//     }

//     // Pre-open tab to avoid popup blockers
//     const newTab = window.open("", "_blank");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLat = position.coords.latitude;
//         const userLng = position.coords.longitude;

//         const destLat = coordinates.lat;
//         const destLng = coordinates.lng;

//         const mapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${destLat},${destLng}`;

//         // Redirect pre-opened tab
//         if (newTab) {
//           newTab.location.href = mapsUrl;
//         } else {
//           window.location.href = mapsUrl;
//         }
//       },
//       (error) => {
//         console.error("Geolocation error:", error);

//         if (newTab) {
//           newTab.close();
//         }

//         alert("Location permission denied or unavailable.");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       },
//     );
//   };

//   return (
//     <button
//       onClick={handleNavigation}
//       className="mt-3 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
//     >
//       <FiMapPin />
//       Navigate with Google Maps
//     </button>
//   );
// }

import { FiMapPin } from "react-icons/fi";

export default function NavigateButton({ coordinates }) {
  const handleNavigation = () => {
    // Validate coordinates
    if (
      !coordinates ||
      coordinates.lat == null ||
      coordinates.lng == null
    ) {
      alert("Event coordinates not available.");
      return;
    }

    const destLat = Number(coordinates.lat);
    const destLng = Number(coordinates.lng);

    // Browser does not support geolocation
    if (!navigator.geolocation) {
      const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;

      window.open(fallbackUrl, "_blank");
      return;
    }

    // Pre-open tab to avoid popup blockers
    const newTab = window.open("", "_blank");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("User Location:", position.coords);

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const mapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${destLat},${destLng}`;

        console.log("Opening Maps:", mapsUrl);

        if (newTab) {
          newTab.location.href = mapsUrl;
        } else {
          window.location.href = mapsUrl;
        }
      },

      (error) => {
        console.error("FULL GEOLOCATION ERROR:", error);

        let message = "";

        switch (error.code) {
          case 1:
            message =
              "Location permission denied. Opening destination directly.";
            break;

          case 2:
            message =
              "Location unavailable. Opening destination directly.";
            break;

          case 3:
            message =
              "Location request timed out. Opening destination directly.";
            break;

          default:
            message =
              "Unable to fetch location. Opening destination directly.";
        }

        console.warn(message);

        // Fallback: open destination only
        const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;

        if (newTab) {
          newTab.location.href = fallbackUrl;
        } else {
          window.location.href = fallbackUrl;
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  return (
    <button
      onClick={handleNavigation}
      className="mt-3 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
    >
      <FiMapPin />
      Navigate with Google Maps
    </button>
  );
}