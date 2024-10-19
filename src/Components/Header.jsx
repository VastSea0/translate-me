import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebase';
import { Menu, X, Home, Info, Settings, LogIn, User, LogOut, Gamepad, GitBranch, Moon, Sun } from 'lucide-react';
import { Discord } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = firestore.collection('users').doc(authUser.uid);
        const userData = await userRef.get();
        if (userData.exists) {
          const data = userData.data();
          setUser(data);
          setDarkMode(data.darkMode || false);
        }
      } else {
        setUser(null);
        setDarkMode(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const menuItems = [
    { icon: Home, text: 'Home', path: '/' },
    { icon: Info, text: 'About', path: '/about' },
    { icon: Settings, text: 'Settings', path: '/settings' },
    { icon: GitBranch, text: 'Contribute', path: '/contribute' },
    { icon: Gamepad, text: 'Playground', path: '/playground' },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDarkMode = () => {
    if (user) {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      firestore.collection('users').doc(user.uid).update({ darkMode: newDarkMode });
    }
  };

  const linkClass = `flex items-center space-x-1 transition-colors ${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}`;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className={linkClass}>
              <Home size={24} />
              <span className="text-xl font-bold">Translate Me!</span>
            </Link>

            <nav className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={linkClass}
                >
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
          

              {user ? (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/profile" className={linkClass}>
                    <User size={20} />
                    <span>{user.displayName || 'Profile'}</span>
                  </Link>
                  <button onClick={handleLogout} className={`${linkClass} text-red-500 hover:text-red-600`}>
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className={`hidden md:flex ${linkClass}`}>
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64  ${ darkMode ?  'bg-gray-800 text-dark'  :  'bg-white text-white'}shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-grow">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.text}</span>
              </Link>
            ))}
            <a
              href="https://discord.com/invite/ZVHmv9dJRf"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Discord size={18} />
              <span>Discord Server</span>
            </a>
          </nav>
          {user && (
            <div className="p-4">
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-4 py-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>{user.displayName || 'Profile'}</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-2 w-full text-left ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-gray-100'} transition-colors`}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
          {!user && (
            <div className="p-4">
              <Link
                to="/login"
                className={`flex items-center space-x-2 px-4 py-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}