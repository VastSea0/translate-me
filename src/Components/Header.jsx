import React, { useState, useEffect } from 'react';
import { auth, firestore, firebase} from '../firebase/firebase';
import { Menu, X, Home, Info, Settings, LogInIcon, User, LogOutIcon, GamepadIcon, GitBranchPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }, []);

  const menuItems = [
    { icon: Home, text: 'Home', path: '/' },
    { icon: Info, text: 'About', path: '/about' },
    { icon: Settings, text: 'Settings', path: '/settings' },
    { icon: GitBranchPlus, text: 'Contribute', path: '/contribute' },
    { icon: GamepadIcon, text: 'Playground', path: '/playground' },
     
  ];


  const handleLogout = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('Oturum başarıyla kapatıldı.');
            navigate('/login');
        })
        .catch((error) => {
            console.error('Oturum kapatma hatası:', error);
        });
  };
 
 
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="flex justify-between items-center px-4 py-3">
        <Link
              to="/"
              className="flex items-center"
              
            >
              <Home size={20} className="mr-4" />
              <span>Translate Me!</span>
            </Link>
        
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <nav className={`
        fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full pt-16">
         <div className="flex  justify-center">
         <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <></>}
          </button>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.text}
                to={item.path}
                className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={20} className="mr-4" />
                <span>{item.text}</span>
              </Link>
            );
          })}

          {user ? (
            <>
            <Link
              to="/profile"
              className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} className="mr-4" />
              <span>Profile</span>
            </Link>
            <button onClick={handleLogout} className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors">
              <LogOutIcon size={20} className="mr-4" />
              <span>Log Out</span>
            </button>
            </>
   
          ) : (
            <Link
              to="/login"
              className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogInIcon size={20} className="mr-4" />
              <span>Log In</span>
            </Link>
          )}
    
        </div>
      </nav>
    </>
  );
}