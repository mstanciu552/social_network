import React from "react";

const Alert = ({ type, res }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`w-3/4 mt-5 py-3 px-4 rounded  z-30 text-xl ${
          type === "success" ? "bg-green-300" : "bg-red-500"
        }`}
      >
        <p>{res.data}</p>
      </div>
    </div>
  );
};

export default Alert;
