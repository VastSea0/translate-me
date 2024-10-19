// DarkModeContext.js
import React, { createContext, useState, useEffect } from 'react';

import { UserIsSignedIn } from '../Components/PartsOfUser';
 

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const user = UserIsSignedIn();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.darkMode !== undefined) {
        setDarkMode(user.darkMode);
      }
    }
  }, [user]);
  
 

 

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
