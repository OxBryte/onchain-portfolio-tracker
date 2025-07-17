import React from "react";

const Settings = () => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-gray-300">
        Configure your portfolio tracker preferences.
      </p>
    </div>

    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Dark Theme</span>
          <div className="w-12 h-6 bg-gray-600 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Notifications</span>
          <div className="w-12 h-6 bg-gray-600 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
