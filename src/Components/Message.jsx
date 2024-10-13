import React from "react";
import {motion, AnimatePresence} from 'framer-motion';

export default function Message({message}) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -50}}
                    className="message"
                >
                    <p>{message}</p>
                    
                </motion.div>
            )}
        </AnimatePresence>
    );
}