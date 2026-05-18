// export const generateLocationImage = (coordinates) => {
//   if (!coordinates?.lat || !coordinates?.lng) return null;

//   const { lat, lng } = coordinates;

//   return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=16&size=600x300&markers=${lat},${lng},red-pushpin`;
// };

import QRCode from "qrcode";

export const generateLocationImage = async (coordinates) => {
  if (!coordinates?.lat || !coordinates?.lng) return null;

  const { lat, lng } = coordinates;

  // Google Maps location link
  const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  // Generate QR
  const qrImage = await QRCode.toDataURL(locationUrl);

  return {
    qrImage,
    locationUrl,
  };
};


