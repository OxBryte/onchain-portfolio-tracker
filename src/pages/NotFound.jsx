import React from "react";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
    <h1 className="text-4xl font-bold mb-4 text-white">404 - Page Not Found</h1>
    <p className="text-gray-400 mb-6">
      The page you're looking for doesn't exist.
    </p>
    <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
      Go back to Dashboard
    </a>
  </div>
);

export default NotFound;
