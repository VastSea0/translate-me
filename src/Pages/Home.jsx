import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserDisplayName, UserIsSignedIn, UserDarkMode } from '../Components/PartsOfUser';
import { Book, LogIn, Award } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const user = UserIsSignedIn();
  const [darkMode, setDarkMode] = useState(false);
  const NUserDarkMode = UserDarkMode();

  useEffect(() => {
    setDarkMode(NUserDarkMode);
  }, [NUserDarkMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-green-100 text-gray-900'}`}>
      <motion.div 
        className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-green-600 dark:text-green-400"
          variants={itemVariants}
        >
          Dil Öğrenme Macerası
        </motion.h1>

        {user ? (
          <>
            <motion.p 
              className="text-base sm:text-lg mb-4 text-center"
              variants={itemVariants}
            >
              Merhaba, <span className="font-semibold"><UserDisplayName /></span>!
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6"
              variants={itemVariants}
            >
              <motion.button 
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                onClick={() => navigate("/playground")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Book className="mr-2" size={16} />
                Öğrenmeye Başla
              </motion.button>
              <motion.button 
                className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                onClick={() => navigate("/profile")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="mr-2" size={16} />
                Profilim
              </motion.button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.p 
              className="text-base sm:text-lg mb-4 text-center"
              variants={itemVariants}
            >
              Yeni bir dil öğrenmeye hazır mısın?
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <motion.button 
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                onClick={() => navigate("/register")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="mr-2" size={16} />
                Kayıt Ol
              </motion.button>
              <motion.button 
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="mr-2" size={16} />
                Giriş Yap
              </motion.button>
            </motion.div>
          </>
        )}

        <motion.div 
          className="mt-6 sm:mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Her gün pratik yaparak dil öğrenmeyi alışkanlık haline getir!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}