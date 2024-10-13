import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Message from '../../Components/Message';
import PlayGroundHeader from '../../Components/PlayGroundHeader';

const baseNumbers = [
    { japanese: "いち", kanji: "一", romaji: "ichi", english: "1" },
    { japanese: "に", kanji: "二", romaji: "ni", english: "2" },
    { japanese: "さん", kanji: "三", romaji: "san", english: "3" },
    { japanese: "し", kanji: "四", romaji: "shi", english: "4" },
    { japanese: "ご", kanji: "五", romaji: "go", english: "5" },
    { japanese: "ろく", kanji: "六", romaji: "roku", english: "6" },
    { japanese: "しち", kanji: "七", romaji: "shichi", english: "7" },
    { japanese: "はち", kanji: "八", romaji: "hachi", english: "8" },
    { japanese: "きゅう", kanji: "九", romaji: "kyuu", english: "9" },
    { japanese: "じゅう", kanji: "十", romaji: "juu", english: "10" },
    { japanese: "じゅういち", kanji: "十一", romaji: "juuichi", english: "11" },
    { japanese: "ひゃく", kanji: "百", romaji: "hyaku", english: "100" },
    { japanese: "せん", kanji: "千", romaji: "sen", english: "1000" },
];

function generateNumbers() {
    const numbers = [...baseNumbers];
    
    for (let i = 12; i <= 20; i++) {
        const tens = Math.floor(i / 10);
        const ones = i % 10;
        
        let japanese, kanji, romaji;
        
        if (ones === 0) {
            japanese = "じゅう";
            kanji = "十";
            romaji = "juu";
        } else {
            japanese = `じゅう${baseNumbers[ones - 1].japanese}`;
            kanji = `十${baseNumbers[ones - 1].kanji}`;
            romaji = `juu${baseNumbers[ones - 1].romaji}`;
        }
        
        numbers.push({
            japanese,
            kanji,
            romaji,
            english: i.toString()
        });
    }
    
    return numbers;
}

const numbers = generateNumbers();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function AdvancedNumberPuzzle() {
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); 
    const [level, setLevel] = useState(1); 
    const [showMessage, setShowMessage] = useState(false);
    const [currentMNumber, setCurrentMNumber] = useState(null);
    
    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        if (shuffledNumbers.length > 0) {
            setShuffledOptions(shuffleOptions());
        }
    }, [currentIndex, shuffledNumbers]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            alert('Süre doldu! Skorunuz: ' + score);
            resetGame();
        }
    }, [timeLeft]);


    const shuffleOptions = () => {
        if (shuffledNumbers.length === 0 || currentIndex >= shuffledNumbers.length) {
            return [];
        }
        const currentNumber = shuffledNumbers[currentIndex];
        const options = [
            currentNumber.english,
            ...numbers
                .filter(num => num.english !== currentNumber.english)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(num => num.english)
        ];
        return shuffleArray(options);
    };



    const handleOptionClick = (option) => {
        const currentNumber = shuffledNumbers[currentIndex];
        if (option === currentNumber.english) {
            setScore(score + 1);
            if (currentIndex < shuffledNumbers.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                alert('Tebrikler! Tüm seviyeleri tamamladınız!');
                resetGame();
            }
        } else {
            setCurrentMNumber(currentNumber);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    };

    const resetGame = () => {
        const newShuffledNumbers = shuffleArray([...numbers]);
        setShuffledNumbers(newShuffledNumbers);
        setCurrentIndex(0);
        setScore(0);
        setTimeLeft(60);
        setLevel(1);
        setShuffledOptions(shuffleOptions());
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <PlayGroundHeader name={"数学の先生 (sūgaku no sensei)"} />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-6">数学の先生 (sūgaku no sensei)</h1>
                {showMessage && ( <Message message={`Yanlış! Doğru cevap: ${currentMNumber.english}`} />)}
                {shuffledNumbers.length > 0 && currentIndex < shuffledNumbers.length && (
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold mb-4">Bu sayı nedir? "{shuffledNumbers[currentIndex].kanji}"</h2>
                        <div className="mb-4">
                            <p>Okunuş: {shuffledNumbers[currentIndex].romaji}</p>
                            <p>Hiragana: {shuffledNumbers[currentIndex].japanese}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {shuffledOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="text-lg">
                            <p>Skor: {score}</p>
                            <p>Kalan Süre: {timeLeft} saniye</p>
                            <p>Seviye: {level}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}