import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds simulated delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <h2 className="text-2xl font-semibold text-white">Loading...</h2>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
