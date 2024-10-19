import React, {useState, useEffect} from "react";
import { UserIsSignedIn } from "./PartsOfUser";

export default function Loading({ text }) {
  const user = UserIsSignedIn();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.darkMode !== undefined) {
        setDarkMode(user.darkMode);
      }
    }
  }
  , [user]);

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen ${darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white' }`}>
      <div className="flex justify-center items-center mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <div className={`text-center ${darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white' }`}>
        {text}...
      </div>
    </div>
  );
}
