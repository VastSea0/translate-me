import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2Icon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserIsSignedIn } from '../Components/PartsOfUser';
import { firestore } from '../firebase/firebase';
import Loading from '../Components/Loading';
import { set } from 'firebase/database';

const AnimatedCard = ({ children, delay, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
  >
    {children}
  </motion.div>
);

export default function PlayGround() {
  const [languageFilter, setLanguageFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const user = UserIsSignedIn();
  const [modeLoader, setModeLoader] = useState(true);
  const [games, setGames] = useState([
    {
      title: "SwipeLingo",
      description: "Kelime kaydırma oyunu.",
      points: 30,
      hashtags: ["#kelime", "#kaydırma"],
      tags: ["Eğlenceli", "Zorlayıcı"],
      language: "english",
      disabled: false,
      id: 1
    },
    {
      title: "Nihongo Sensei",
      description: "Geleneksel Japon ses sistemlerini öğrenin",
      points: 170,
      hashtags: ["#Hiragana", "#Katakana"],
      tags: ["Eğitici", "Zor"],
      language: "japanese",
      disabled: false,
      id: 2
    },
    {
      title: "数学の先生",
      description: "Japonca sayıları öğrenin.",
      points: 200,
      hashtags: ["#sayısal", "#kanji"],
      tags: ["Eğitici", "Japonca"],
      language: "japanese",
      disabled: false,
      id: 3
    },
    {
      title: "Click N Words",
      description: "Boşlukları doldurun.",
      points: 120,
      hashtags: ["#cümle", "#seçme"],
      tags: ["Cümle", "İngilizce"],
      language: "english",
      disabled: false,
      id: 4
    },
    {
      title: "Kelime Bulmaca",
      description: "Verilen ipuçlarına göre kelimeyi bulun.",
      points: 180,
      hashtags: ["#bulmaca", "#kelime"],
      tags: ["Eğlenceli", "Zorlayıcı"],
      language: "turkish",
      disabled: true,
      id: 5
    },
    {
      title: "Şarkı Çevirme",
      description: "Sevdiğiniz şarkıları çevirin.",
      points: 160,
      hashtags: ["#şarkı", "#toplulık"],
      tags: ["Eğlenceli", "Sosyal"],
      language: "all",
      id: 6
    }
  ]);

  useEffect(() => {
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.darkMode !== undefined) {
            setDarkMode(data.darkMode);
          }
        }
      });
    }
  }, [user]);


  const handleLanguageFilterChange = (value) => {
    setLanguageFilter(value);
    setIsFilterOpen(false);
  }


  const filteredGames = languageFilter === "all" 
    ? games 
    : games.filter(game => game.language === languageFilter);


  useEffect(() => {
    const timer = setTimeout(() => {
      setModeLoader(false);
    }
    , 1000);


    return () => clearTimeout(timer);
  }, [])
 

  if (modeLoader) {
    return <Loading text={"Loading Games"} />;
  }

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">PlayGround</h1>
        { /* <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>*/}
        </div>
        
        <div className="mb-6 relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <span className="flex items-center justify-between">
              <span>{languageFilter === 'all' ? 'Tüm Diller' : languageFilter.charAt(0).toUpperCase() + languageFilter.slice(1)}</span>
              <ChevronDownIcon className={`w-5 h-5 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
            </span>
          </button>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute z-10 w-full mt-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg shadow-lg`}
              >
                {['all', 'english', 'japanese', 'turkish', 'german', 'french', 'spanish'].map((lang) => (
                  <button
                    key={lang}
                    className={`block w-full text-left px-4 py-2 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none`}
                    onClick={() => handleLanguageFilterChange(lang)}
                  >
                    {lang === 'all' ? 'Tüm Diller' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="space-y-4">
          {filteredGames.map((game, index) => (
            <AnimatedCard key={game.id} delay={index} darkMode={darkMode}>
              <div className={`p-4 ${game.disabled ? 'opacity-60' : ''}`}>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{game.title}</h3>
                <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{game.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} text-xs font-medium px-2.5 py-0.5 rounded`}>
                    {game.points} puan
                  </span>
                  {game.hashtags.map((hashtag, idx) => (
                    <span key={idx} className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded`}>
                      {hashtag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, idx) => (
                    <span key={idx} className={`${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'} text-xs font-medium px-2.5 py-0.5 rounded`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} px-4 py-3 flex justify-between items-center`}>
                {game.disabled ? (
                  <span className={`text-sm font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Çok Yakında!</span>
                ) : (
                  <Link to={`/playground/${game.id}`} className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105`}>
                    <Gamepad2Icon className="w-5 h-5 mr-2" />
                    <span>Oyna</span>
                  </Link>
                )}
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{game.language}</span>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}