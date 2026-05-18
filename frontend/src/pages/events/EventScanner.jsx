import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function EventScanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("standalone-reader", {
      fps: 15,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      supportedScanTypes: [0, 1] // 0 = Camera stream, 1 = File Upload tab
    });

    const onSuccess = (decodedText) => {
      scanner.clear();
      
      // Match 24-character hexadecimal MongoDB ObjectId string pattern
      const idRegex = /[0-9a-fA-F]{24}/;
      const match = decodedText.match(idRegex);

      if (match) {
        navigate(`/events/${match[0]}`); // 🚀 Redirect to details view
      } else {
        alert("Invalid ticket template structure. Text read: " + decodedText);
        window.location.reload();
      }
    };

    const onError = () => {};
    scanner.render(onSuccess, onError);

    return () => {
      scanner.clear().catch((err) => console.warn("Scanner shutdown safely handled", err));
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Ticket Validation Center</h2>
          <p className="text-xs text-slate-400 mt-1">
            Scan via live video stream or switch tabs to upload a saved image ticket file.
          </p>
        </div>

        {/* 🎨 Custom CSS injection container to enforce styled dark text strings */}
        <div 
          id="standalone-reader" 
          className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3
                     [&_span]:text-slate-700 [&_span]:font-medium
                     [&_a]:text-blue-600 [&_a]:underline [&_a]:font-semibold [&_a]:block [&_a]:text-center [&_a]:mt-4 [&_a]:cursor-pointer
                     [&_button]:bg-blue-600 [&_button]:text-white [&_button]:text-xs [&_button]:font-semibold [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-lg [&_button]:mt-3 [&_button]:mx-auto [&_button]:block [&_button]:hover:bg-blue-700
                     [&_select]:bg-white [&_select]:border [&_select]:border-slate-300 [&_select]:rounded-lg [&_select]:p-1 [&_select]:text-xs [&_select]:text-slate-700 [&_select]:mt-2 [&_select]:block [&_select]:mx-auto text-slate-800"
        ></div>
      </div>
    </div>
  );
}
