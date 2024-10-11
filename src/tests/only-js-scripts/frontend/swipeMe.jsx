import React, { useState } from "react";
import { motion } from 'framer-motion';

export default function PlayGround(){
    const [firstWord, setFirstWord] = useState(false);
    const [secondWord, setSecondWord] = useState(false);
    const [rotate, setRotate] = useState(0);

    return(
        <div className="container mt-5">
            <h2 className="text-3xl font-bold">PlayGround</h2>
            <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title">User PlayGround</h5>
                <p className="card-text">Slide specific words.</p>
                <p className="flex justify-center items-center">
                First Word | Second Word
                </p>

                <hr></hr>

                <div className="flex justify-center items-center">
                {firstWord && <h1>First Word</h1>}
                {secondWord && <h1>Second Word</h1>}
                </div>
                <div className="flex justify-center items-center bg-gray-100">
                <div 
                    style={{ width: 300, height: 500 }}
                    className={`max-w-sm ${firstWord ? 'bg-green-500' : 'bg-yellow-500'} rounded-lg shadow-lg p-6 text-white cursor-pointer`}
                >
                    <p>
                    {!firstWord && 'First Word'}
                    </p>
                </div>
                <motion.div
                    style={{ width: 300, height: 500, rotate }}
                    className="max-w-sm bg-red-500 rounded-lg shadow-lg p-6 text-white cursor-pointer"
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    whileTap={{ scale: 1.1 }}
                    onDragEnd={(event, info) => {
                    if (info.offset.x > 100) {
                        console.log('Sağa atıldı!');
                        setFirstWord(false);
                        setSecondWord(true);
                    } else if (info.offset.x < -100) {
                        console.log('Sola atıldı!');
                        setFirstWord(true);
                        setSecondWord(false);
                    }
                    setRotate(0); // Döndürmeyi sıfırla
                    }}
                    initial={{ opacity: 0 }} // Başlangıç animasyonu
                    animate={{ opacity: 1 }} // Görünürlük animasyonu
                    transition={{ duration: 0.5 }} // Animasyon süresi
                    onDrag={(event, info) => {
                    if (info.offset) {
                        if (info.offset.x > 0) {
                        setRotate(15); // Sağa kaydırırken döndürme
                        } else {
                        setRotate(-15); // Sola kaydırırken döndürme
                        }
                    }
                    }}
                >
                    <h2 className="text-2xl font-bold mb-2">Swipe Me!</h2>
                    <p className="text-lg">Drag this card left or right.</p>
                </motion.div>
                <div 
                    style={{ width: 300, height: 500 }}
                    className={`max-w-sm ${secondWord ? 'bg-green-500' : 'bg-yellow-500'} rounded-lg shadow-lg p-6 text-white cursor-pointer`}
                >
                    <p>
                    {!secondWord && 'Second Word'}
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
}