import React , {useState, useEffect} from "react";
import {motion, AnimatePresence} from 'framer-motion';
import { UserIsSignedIn } from "./PartsOfUser";

export default function Message({message}) {
    const [darkMode, setDarkMode] = useState(false);
    const user = UserIsSignedIn();

    useEffect(() => {
        if (user) {
            if (user.darkMode !== undefined) {
                setDarkMode(user.darkMode);
            }
        }
    }
    , [user]);

    return (
 <>
            {message && (
                <motion.div
                        className="fixed inset-x-0 top-16 flex items-center justify-center z-40"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white' }`}>
                            <p className="text-lg font-semibold">{message}</p>
                        </div>
                    </motion.div>
            )}
                 
  </>
    );
}