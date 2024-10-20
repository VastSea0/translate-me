import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCw, X, Clock, Award, BookOpen } from 'lucide-react';
import PlayGroundHeader from '../../Components/PlayGroundHeader';
import { firestore, auth } from "../../firebase/firebase";
import { UserScore } from '../../Components/PartsOfUser';

const ClickNWords = () => {
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [words, setWords] = useState([]);
  const [blanks, setBlanks] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
          if (authUser) {
              const userRef = firestore.collection('users').doc(authUser.uid);
              const userData = await userRef.get();
              if (userData.exists) {
                  const data = userData.data();
                  setUser(data);
              }
          }
      });

      return () => unsubscribe();
  }, [setUser]);


 
  useEffect(() => {
    const fetchSentences = () => {
      // Örnek cümleler ve çevirileri (daha fazla cümle eklenebilir)
      const sampleSentences = [
        { en: "The weather is very nice today", tr: "Bugün hava çok güzel" },
        { en: "I love learning new languages", tr: "Yeni diller öğrenmeyi seviyorum" },
        { en: "Can you help me please", tr: "Bana yardım edebilir misin lütfen" },
        { en: "What time is the meeting tomorrow", tr: "Yarın toplantı saat kaçta" },
        { en: "This book is very interesting", tr: "Bu kitap çok ilginç" },
        { en: "I enjoy cooking Italian food", tr: "İtalyan yemeği pişirmeyi seviyorum" },
        { en: "The concert was amazing last night", tr: "Dün gece konser harikaydı" },
        { en: "We should protect the environment", tr: "Çevreyi korumalıyız" },
        { en: "She plays the piano beautifully", tr: "O piyanoyu güzel çalıyor" },
        { en: "They are traveling to Paris next month", tr: "Gelecek ay Paris'e seyahat ediyorlar" },
        { en: "The movie was better than I expected", tr: "Film beklediğimden daha iyiydi" },
        { en: "He always drinks coffee in the morning", tr: "O her sabah kahve içer" },
        { en: "We need to finish this project by Friday", tr: "Bu projeyi Cuma gününe kadar bitirmeliyiz" },
        { en: "The children are playing in the park", tr: "Çocuklar parkta oynuyor" },
        { en: "I forgot to bring my umbrella today", tr: "Bugün şemsiyemi getirmeyi unuttum" },
        { en: "She speaks three languages fluently", tr: "O üç dili akıcı bir şekilde konuşuyor" },
        { en: "The sun rises in the east", tr: "Güneş doğudan doğar" },
        { en: "I need to buy some groceries", tr: "Biraz market alışverişi yapmam gerekiyor" },
        { en: "She is studying for her final exams", tr: "Final sınavları için çalışıyor" },
        { en: "We should recycle more to save the planet", tr: "Gezegeni kurtarmak için daha fazla geri dönüşüm yapmalıyız" },
        { en: "The museum is closed on Mondays", tr: "Müze Pazartesileri kapalıdır" },
        { en: "I like to go for a walk in the evening", tr: "Akşamları yürüyüşe çıkmayı severim" },
        { en: "They are planning a surprise party", tr: "Sürpriz bir parti planlıyorlar" },
        { en: "The train leaves at seven o'clock", tr: "Tren saat yedide kalkıyor" },
        { en: "She won first prize in the competition", tr: "Yarışmada birinci oldu" },
        { en: "We need to make a reservation for dinner", tr: "Akşam yemeği için rezervasyon yaptırmamız gerekiyor" },
        { en: "The concert was sold out in minutes", tr: "Konser biletleri dakikalar içinde tükendi" },
        { en: "He is learning to play the guitar", tr: "Gitar çalmayı öğreniyor" },
        { en: "The flowers in the garden are beautiful", tr: "Bahçedeki çiçekler çok güzel" },
        { en: "We should leave early to avoid traffic", tr: "Trafiğe yakalanmamak için erken çıkmalıyız" },
        { en: "She always keeps her promises", tr: "O her zaman sözünü tutar" },
        { en: "The cat is sleeping on the couch", tr: "Kedi koltukta uyuyor" },
        { en: "I need to buy a new phone", tr: "Yeni bir telefon almam gerekiyor" },
        { en: "They are going on vacation next week", tr: "Gelecek hafta tatile çıkıyorlar" },
        { en: "The restaurant serves delicious food", tr: "Restoran lezzetli yemekler sunuyor" },
        { en: "She is writing a novel", tr: "Bir roman yazıyor" },
        { en: "We should exercise more often", tr: "Daha sık egzersiz yapmalıyız" },
        { en: "The movie starts at eight thirty", tr: "Film sekiz buçukta başlıyor" },
        { en: "I forgot my keys at home", tr: "Anahtarlarımı evde unuttum" },
        { en: "They are building a new shopping mall", tr: "Yeni bir alışveriş merkezi inşa ediyorlar" },
        { en: "The concert was cancelled due to rain", tr: "Konser yağmur nedeniyle iptal edildi" },
        { en: "She is learning to drive a car", tr: "Araba kullanmayı öğreniyor" },
        { en: "We need to clean the house", tr: "Evi temizlememiz gerekiyor" },
        { en: "The birds are singing in the trees", tr: "Kuşlar ağaçlarda şarkı söylüyor" },
        { en: "He is allergic to peanuts", tr: "Fıstığa alerjisi var" },
        { en: "The library is open until nine pm", tr: "Kütüphane akşam dokuza kadar açık" },
        { en: "They are celebrating their anniversary", tr: "Yıldönümlerini kutluyorlar" },
        { en: "I need to get my hair cut", tr: "Saçımı kestirmem gerekiyor" },
        { en: "The bus is always late", tr: "Otobüs her zaman geç kalıyor" },
        { en: "She won a scholarship to study abroad", tr: "Yurtdışında okumak için burs kazandı" },
        { en: "We should plant more trees", tr: "Daha fazla ağaç dikmeliyiz" }
      ];
      setSentences(sampleSentences);
      setCurrentSentenceIndex(0);
      setupCurrentSentence(sampleSentences[0].en);
      setIsLoading(false);
    };

    fetchSentences();
  }, []);

  useEffect(() => {
    
    
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameCompleted(true);
      const updateScore = async () => {
        if (user) {
          await firestore.collection('users').doc(user.uid).update(
            { 
              userScore:  user.userScore  + score,
              englishScore: user.englishScore  + score
             }
          );
        }
      };
      updateScore();
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, user, score]);

  useEffect(() => {
    if (sentences.length > 0) {
      setupCurrentSentence(sentences[currentSentenceIndex].en);
    }
  }, [currentSentenceIndex, sentences]);

  const setupCurrentSentence = (sentence) => {
    const words = sentence.split(' ');
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    setWords(shuffledWords);
    
    const blanksArray = words.map(() => '_____');
    setBlanks(blanksArray);
  };

  const handleWordClick = (word) => {
     
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    console.log("userScore",user.userScore);
    const newBlanks = [...blanks];
    const emptyIndex = newBlanks.findIndex(blank => blank === '_____');
    const wordIndex = newBlanks.indexOf(word);
    
    if (wordIndex !== -1) {
      // If the word is already in blanks, remove it and add it back to words
      newBlanks[wordIndex] = '_____';
      setBlanks(newBlanks);
      setWords([...words, word].sort(() => Math.random() - 0.5));
    } else if (emptyIndex !== -1) {
      // If there's an empty space, add the word to blanks and remove it from words
      newBlanks[emptyIndex] = word;
      setBlanks(newBlanks);
      setWords(words.filter(w => w !== word));
    }

    if (newBlanks.every(blank => blank !== '_____')) {
      const currentSentence = sentences[currentSentenceIndex].en;
      const correctWords = currentSentence.split(' ');
      const correctCount = newBlanks.filter((word, index) => word === correctWords[index]).length;
      setScore(prevScore => prevScore + correctCount);

      if (currentSentenceIndex < sentences.length - 1) {
        setTimeout(() => {
          setCurrentSentenceIndex(prevIndex => prevIndex + 1);
        }, 1000);
      } else {
        setGameCompleted(true);
        setIsTimerRunning(false);
      }
    }
  };

  const resetGame = () => {
    setCurrentSentenceIndex(0);
    setupCurrentSentence(sentences[0].en);
    setScore(0);
    setTimer(60);
    setGameCompleted(false);
    setIsTimerRunning(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw size={48} className="text-blue-500" />
        </motion.div>
      </div>
    );
  }

  const currentSentence = sentences[currentSentenceIndex];

  return (
    <div className="min-h-screen bg-gray-100 overflow-y-auto">
      <PlayGroundHeader name="Click N Words" />
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-blue-600">Click N Words</h2>
        {!gameCompleted ? (
          <>
            <div className="mb-2 md:mb-3 bg-white p-2 md:p-3 rounded-lg shadow-md">
              <div className="grid grid-cols-3 gap-1 md:gap-2 mb-2">
                <div className="flex flex-col items-center">
                  <Clock className="text-blue-600 mb-1" size={16} />
                  <p className="text-sm md:text-base font-bold">{timer}s</p>
                  <p className="text-xs text-gray-600">Time Left</p>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="text-yellow-600 mb-1" size={16} />
                  <p className="text-sm md:text-base font-bold">{score}</p>
                  <p className="text-xs text-gray-600">Current Score</p>
                </div>
                <div className="flex flex-col items-center">
                  <BookOpen className="text-green-600 mb-1" size={16} />
                  <p className="text-sm md:text-base font-bold">{sentences.length - currentSentenceIndex - 1}</p>
                  <p className="text-xs text-gray-600">Sentences Left</p>
                </div>
              </div>
              <div className="border-t pt-2">
                <p className="text-sm md:text-base font-semibold">Total Score: <UserScore /></p>
              </div>
            </div>
            <div className="mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-lg shadow-md">
              <p className="text-base md:text-lg font-medium mb-2">English Sentence:</p>
              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                {blanks.map((word, index) => (
                  <motion.span
                    key={index}
                    className={`p-1 md:p-2 ${word === '_____' ? 'border-2 border-dashed border-gray-400' : 'bg-blue-500 text-white'} rounded-md text-sm md:text-base cursor-pointer`}
                    whileHover={{ scale: 1.05 }}
                    layout
                    onClick={() => word !== '_____' && handleWordClick(word)}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-lg shadow-md">
              <p className="text-base md:text-lg font-medium mb-2">Turkish Translation:</p>
              <p className="text-lg md:text-xl text-center text-gray-700">{currentSentence.tr}</p>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-2 justify-center mb-4 md:mb-6">
              <AnimatePresence>
                {words.map((word, index) => (
                  <motion.button
                    key={word}
                    onClick={() => handleWordClick(word)}
                    className="p-1 md:p-2 bg-blue-500 text-white rounded-md cursor-pointer text-sm md:text-base font-medium shadow-md"
                    whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    layout
                  >
                    {word}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentSentenceIndex(prev => Math.max(0, prev - 1))}
                className="flex items-center px-2 md:px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-xs md:text-sm"
                disabled={currentSentenceIndex === 0}
              >
                <ChevronLeft size={14} className="mr-1" />
                Previous
              </button>
              <button
                onClick={resetGame}
                className="flex items-center px-2 md:px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs md:text-sm"
              >
                <X size={14} className="mr-1" />
                End Game
              </button>
              <button
                onClick={() => setCurrentSentenceIndex(prev => Math.min(sentences.length - 1, prev + 1))}
                className="flex items-center px-2 md:px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-xs md:text-sm"
                disabled={currentSentenceIndex === sentences.length - 1}
              >
                Next
                <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-600">Game Completed!</h3>
            <p className="text-lg md:text-xl mb-3 md:mb-4">Your final score: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white rounded-md text-base md:text-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClickNWords;
