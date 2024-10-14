import React from "react";
import {motion, AnimatePresence} from 'framer-motion';

export default function Message({message}) {
    return (
 <>
            {message && (
                <motion.div
                        className="fixed inset-x-0 top-16 flex items-center justify-center z-40"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <div className="bg-white p-3 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold">{message}</p>
                        </div>
                    </motion.div>
            )}
                 
  </>
    );
}