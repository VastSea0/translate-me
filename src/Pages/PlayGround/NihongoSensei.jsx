import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PlayGroundHeader from "../../Components/PlayGroundHeader";
import Words from "./JapaneseStrings";
import { set } from "firebase/database";

export default function NigongoSensi() {
    const [firstWord, setFirstWord] = useState(false);
    const [secondWord, setSecondWord] = useState(false);
    const [rotate, setRotate] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(null);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showCountdown, setShowCountdown] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [writingSystem, setWritingSystem] = useState('hiragana');
    const [cardColor, setCardColor] = useState('bg-blue-500');



    useEffect(() => {
        startNewSet();
    }, [writingSystem]);

    useEffect(() => {
        if (countdown > 0 && showCountdown) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && showCountdown) {
            setTimeout(() => setShowCountdown(false), 2000);
        }
    }, [countdown, showCountdown]);

    const startNewSet = () => {
        const shuffledWords = Object.values(Words.japanese[writingSystem]).sort(() => Math.random() - 0.5);
        setCurrentWordIndex(0);
        setGameOver(false);
        setMessage('');
        setNextWord(shuffledWords[0]);
        setCountdown(5);
        setShowCountdown(true);
    };

    const handleWritingSystemChange = (event) => {
      setWritingSystem(event.target.value);
    };

    const setNextWord = (word) => {
        setCurrentWord(word);
        const correctTranslation = word.translation;
        const incorrectTranslation = word.falseStates[Math.floor(Math.random() * word.falseStates.length)];
        const newOptions = [correctTranslation, incorrectTranslation].sort(() => Math.random() - 0.5);
        setOptions(newOptions);
        setFirstWord(false);
        setSecondWord(false);
        setRotate(0);
    };

    const handleSwipe = (direction) => {
        if (direction === 'left') {
            handleOptionClick(options[0]);
        } else if (direction === 'right') {
            handleOptionClick(options[1]);
        }
    };

    const handleOptionClick = (selectedOption) => {
        if (selectedOption === currentWord.translation) {
            setMessage('Tebrikler! Doğru cevap.');
            setCardColor('bg-green-500');
            if (currentWordIndex + 1 < Object.keys(Words.japanese[writingSystem]).length) {
                setShowMessage(true);
                setTimeout(() => {
                    setCurrentWordIndex(currentWordIndex + 1);
                    setNextWord(Object.values(Words.japanese[writingSystem])[currentWordIndex + 1]);
                    setMessage('');
                    setShowMessage(false);
                }, 1500);
            } else {
                setMessage('Tebrikler! Seti tamamladınız.');
                setGameOver(true);
            }
        } else {
            setMessage('Üzgünüm, yanlış cevap. Tekrar deneyin.');
            setCardColor('bg-red-500');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setRotate(0);
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

          <PlayGroundHeader name={"Nihongo Sensei (日本語先生)"} />
    
        <main className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="mb-4">
                    <select 
                        value={writingSystem} 
                        onChange={handleWritingSystemChange}
                        className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="hiragana">Hiragana</option>
                        <option value="katakana">Katakana</option>
                    </select>
                </div>

            <AnimatePresence>
                {showCountdown && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {countdown > 0 ? (
                            <div className={`text-8xl font-bold transition-all duration-500 ease-in-out transform scale-150
                                ${countdown === 5 ? 'text-red-500' :
                                countdown === 4 ? 'text-orange-500' :
                                countdown === 3 ? 'text-yellow-500' :
                                countdown === 2 ? 'text-green-500' :
                                'text-blue-500'}`}>
                                {countdown}
                            </div>
                        ) : (
                            <div className="text-5xl font-bold text-white animate-pulse">
                              さあ、始めよう!
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
    
            <AnimatePresence>
                {showMessage && (
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
            </AnimatePresence>
    
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">{message}</h2>
                            <button
                                onClick={startNewSet}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                            >
                                Yeni Set Başlat
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
    
            <div className="w-full max-w-md">
                <div className="mb-4 text-center">
                    <p className="text-lg font-semibold">
                        {currentWord?.self}
                    </p>
                    <p className="text-sm text-gray-600">
                        Doğru çeviriyi seçmek için kartı kaydırın
                    </p>
                </div>
    
                <div className="relative h-80 w-full max-w-sm mx-auto">
    <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-center z-0">
        <div className={`w-full h-full ${firstWord ? cardColor : 'bg-blue-500'} rounded-lg flex items-center justify-center transition-colors duration-300`}>
            <p className="text-xl font-bold text-white">
                {options[0]}
            </p>
        </div>
    </div>
    <motion.div
        className="absolute inset-y-0 left-1/3 w-1/3 bg-white rounded-lg shadow-lg flex items-center justify-center z-10"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        whileTap={{ scale: 1.05 }}
        onDragEnd={(event, info) => {
            if (info.offset.x > 100) {
                setFirstWord(false);
                setSecondWord(true);
                handleSwipe('right');
            } else if (info.offset.x < -100) {
                setFirstWord(true);
                setSecondWord(false);
                handleSwipe('left');
            }
            setRotate(0);
        }}
        animate={{ x: 0, rotate }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onDrag={(event, info) => {
            setRotate(info.offset.x * 0.1);
        }}
        style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
    >
        <div className="text-center p-6">
            <h2 className="text-3xl font-bold mb-2">{currentWord?.self}</h2>
            <p className="text-gray-600">Sola veya sağa kaydırın</p>
        </div>
    </motion.div>
    <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-center z-0">
        <div className={`w-full h-full ${secondWord ? cardColor : 'bg-blue-500'} rounded-lg flex items-center justify-center transition-colors duration-300`}>
            <p className="text-xl font-bold text-white">
                {options[1]}
            </p>
        </div>
    </div>
</div>

            </div>
        </main>
    
    
    </div>
    );
}