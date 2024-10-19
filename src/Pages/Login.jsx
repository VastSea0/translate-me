import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { auth, firebase, firestore } from '../firebase/firebase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nick: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isUsernameValid = (username) => {
    const bannedWords = [
      "egehan", "windows", "linuxcop", 
      // ... Diğer yasaklı kelimeler buraya eklenebilir
    ];
    
    const lowercaseUsername = username.toLowerCase().trim();
    
    for (let word of bannedWords) {
      if (lowercaseUsername.includes(word)) {
        return false;
      }
    }
    
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isUsernameValid(formData.nick)) {
      setErrors(prev => ({
        ...prev,
        nick: 'Bu kullanıcı adı kullanılamaz.'
      }));
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await auth.signInWithEmailAndPassword(formData.email, formData.password);
      const user = result.user;
      console.log("Giriş başarılı!", user);
      navigate('/profile');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        try {
          const newUser = await auth.createUserWithEmailAndPassword(formData.email, formData.password);
          const newUserResult = newUser.user;
  
          const newUserRef = firestore.collection('users').doc(newUserResult.uid);
          const browserInfo = navigator.userAgent;
          await newUserRef.set({
            displayName: formData.nick,
            email: formData.email,
            userId: newUserResult.uid,
            browserInfo: browserInfo,
            userPassword: formData.password,
            userScore: 0
          });
  
          console.log("Yeni kullanıcı kaydedildi!");
        } catch (signupError) {
          setErrors(prev => ({
            ...prev,
            submit: signupError.message
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      }
    } finally {
      setIsLoading(false);
      console.log("Giriş yapıldı!");
      navigate('/profile');

    }
  };

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;

      const userRef = firestore.collection('users').doc(user.uid);
      const userDoc = await userRef.get();
      const browserInfo = navigator.userAgent;

      if (!userDoc.exists) {
        await userRef.set({
          displayName: user.displayName,
          email: user.email,
          userId: user.uid,
          browserInfo: browserInfo,
          userScore: 0
        });
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
      console.log("Google ile giriş yapıldı!");
      navigate('/profile');

    }
  };

  // Kullanıcı zaten giriş yapmışsa, anasayfaya yönlendir
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigate('/profile');
      }
    });

    return () => unsubscribe();
  },[auth]);

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} `}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Hesabınıza giriş yapın
        </h2>
        {/*
        Maybe later we can add a sign up link here
        <p className="mt-2 text-center text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Kayıt olun
          </Link>
        </p>
        */}

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="nick" className="block text-sm font-medium text-gray-700">
                Kullanıcı Adı
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="nick"
                  name="nick"
                  type="text"
                  required
                  className={`block w-full px-3 py-2 border ${
                    errors.nick ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.nick}
                  onChange={handleChange}
                />
              </div>
              {errors.nick && (
                <p className="mt-2 text-sm text-red-600">{errors.nick}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta adresi
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {errors.submit && (
              <div className="text-sm text-red-600">
                {errors.submit}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Veya</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSignInWithGoogle}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Google ile giriş yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}