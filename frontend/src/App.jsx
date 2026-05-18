
// // import AppRoutes from "./routes/AppRoutes";

// // function App() {
// //   return <AppRoutes />;
// // }

// // export default App;

// import AppRoutes from "./routes/AppRoutes";

// export default function App() {
//   return <AppRoutes />;
// }

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <AppRoutes />
    </div>
  );
}