import React from "react";

const Loader = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}
  >
    <div className="loader-spinner" style={{ marginBottom: 8 }} />
    <span>Loading...</span>
  </div>
);

export default Loader;
