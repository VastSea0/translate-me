import React, { useState, useEffect } from 'react';

const Game = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(true);
  const Words = {
    "english": {
        "words": {
            "hello": {
                self: "Hello",
                translation: "Merhaba",
                falseStates: ["Selam", "Naber", "Nasılsın"],
                id: 0
            },
            "goodbye": {
                self: "Goodbye",
                translation: "Hoşça kal",
                falseStates: ["Güle güle", "Elveda", "Hoş geldin"],
                id: 1
            },
            "please": {
                self: "Please",
                translation: "Lütfen",
                falseStates: ["Teşekkürler", "Rica ederim", "Merhaba"],
                id: 2
            },
            "thank you": {
                self: "Thank you",
                translation: "Teşekkür ederim",
                falseStates: ["Rica ederim", "Lütfen", "Merhaba"],
                id: 3
            },
            "yes": {
                self: "Yes",
                translation: "Evet",
                falseStates: ["Hayır", "Belki", "Olabilir"],
                id: 4
            },
            "no": {
                self: "No",
                translation: "Hayır",
                falseStates: ["Evet", "Belki", "Olabilir"],
                id: 5
            }
        }
    }
};
  useEffect(() => {
    startNewSet();
  }, []);

  useEffect(() => {
    if (countdown > 0 && showCountdown) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && showCountdown) {
      setTimeout(() => setShowCountdown(false), 2000);
    }
  }, [countdown, showCountdown]);

  const startNewSet = () => {
    const shuffledWords = Object.values(Words.english.words).sort(() => Math.random() - 0.5);
    setWords(shuffledWords);
    setCurrentWordIndex(0);
    setGameOver(false);
    setMessage('');
    setNextWord(shuffledWords[0]);
    setCountdown(5);
    setShowCountdown(true);
  };

  const setNextWord = (word) => {
    const correctTranslation = word.translation;
    const incorrectTranslation = word.falseStates[Math.floor(Math.random() * word.falseStates.length)];
    const newOptions = [correctTranslation, incorrectTranslation].sort(() => Math.random() - 0.5);
    setOptions(newOptions);
  };

  const handleOptionClick = (selectedOption) => {
    const currentWord = words[currentWordIndex];
    if (selectedOption === currentWord.translation) {
      setMessage('Tebrikler! Doğru cevap.');
      if (currentWordIndex + 1 < words.length) {
        setTimeout(() => {
          setCurrentWordIndex(currentWordIndex + 1);
          setNextWord(words[currentWordIndex + 1]);
          setMessage('');
        }, 1500);
      } else {
        setMessage('Tebrikler! Seti tamamladınız.');
        setGameOver(true);
      }
    } else {
      setMessage('Üzgünüm, yanlış cevap. Tekrar deneyin.');
    }
  };

  if (words.length === 0) {
    return <div>Yükleniyor...</div>;
  }

  const currentWord = words[currentWordIndex];

  return (
    <div className="relative h-screen w-screen">
      {showCountdown && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          {countdown > 0 ? (
            <div className={`text-9xl font-bold transition-all duration-500 ease-in-out transform scale-150
              ${countdown === 5 ? 'text-red-500' :
                countdown === 4 ? 'text-orange-500' :
                countdown === 3 ? 'text-yellow-500' :
                countdown === 2 ? 'text-green-500' :
                'text-blue-500'}`}>
              {countdown}
            </div>
          ) : (
            <div className="text-6xl font-bold text-white animate-pulse">
              Ready GO!
            </div>
          )}
        </div>
      )}
      
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Kelime Öğrenme Oyunu</h2>
        {!gameOver ? (
          <>
            <p className="text-xl mb-4">Kelime: {currentWord.self}</p>
            <div className="space-x-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-4 text-lg font-semibold">{message}</p>
          </>
        ) : (
          <div>
            <p className="text-xl font-bold mb-4">{message}</p>
            <button
              onClick={startNewSet}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Yeni Set Başlat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;