import React from "react";

export default function Loading({ text }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex justify-center items-center mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <div className="text-center">
        {text}...
      </div>
    </div>
  );
}
