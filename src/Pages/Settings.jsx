import React, { useState, useEffect } from 'react';
import { ChevronRight, Moon, Bell, Lock, PieChart, Info, User, Smartphone, ChevronLeft, Mail, Terminal, ToggleLeft, Database, Bug , Award} from 'lucide-react';
import { UserScore, UserMail, UserDisplayName, UserIsSignedIn, useAddNewUserData, UserFetchSpecificUserData } from '../Components/PartsOfUser';
import Loading from '../Components/Loading';
import { firestore } from '../firebase/firebase';


const SettingsItem = ({ icon, title, description, onClick, disabled, darkMode }) => (
  <div 
    className={`flex items-center justify-between p-4 border-b ${
      darkMode ? 'border-gray-700' : 'border-gray-200'
    } ${
      disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'
    }`} 
    onClick={disabled ? undefined : onClick}
  >
    <div className="flex items-center">
      {React.cloneElement(icon, { className: `${icon.props.className} ${disabled ? 'opacity-50' : ''}` })}
      <div className="ml-4">
        <h3 className={`text-base font-medium ${
          disabled ? 'text-gray-400' : darkMode ? 'text-gray-200' : 'text-gray-900'
        }`}>{title}</h3>
        {description && <p className={`text-sm ${
          disabled ? 'text-gray-300' : darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>{description}</p>}
      </div>
    </div>
    {!disabled && <ChevronRight className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
  </div>
);


const AccountDetailItem = ({ icon, title, value }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center">
      {icon}
      <div className="ml-4">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  </div>
);

const AccountDetails = ({ onBack }) => (
  <div className="bg-white min-h-screen">
    <div className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
      <ChevronLeft className="text-gray-400 cursor-pointer" size={24} onClick={onBack} />
      <h2 className="ml-4 text-lg font-medium leading-6 text-gray-900">Hesap Bilgileri</h2>
    </div>
    <div>
      <AccountDetailItem 
        icon={<User className="text-blue-500" size={24} />}
        title="Görünen Ad"
        value={<UserDisplayName />}
      />
      <AccountDetailItem 
        icon={<Mail className="text-green-500" size={24} />}
        title="E-posta"
        value={<UserMail />}
      />
      <AccountDetailItem 
        icon={<Award className="text-purple-500" size={24} />}
        title="Skor"
        value={<UserScore />}
      />
      <hr />
      <AccountDetailItem 
        icon={<Terminal className="text-purple-500" size={24} />}
        title="Geliştirici Modu"
        value={<UserFetchSpecificUserData field={"testMode"} />}
      />
    </div>
  </div>
);


const AnalyticsDetails = ({ onBack }) => {
  const user = UserIsSignedIn();
  const [awardDeveloper, setAwardDeveloper] = useState(false);
  const [awardMaster, setAwardMaster] = useState(false);
  const [awardDetermined, setAwardDetermined] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [japaneseScore, setJapaneseScore] = useState(0);
  const [englishScore, setEnglishScore] = useState(0);
  
  useEffect(() => {
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.awardDeveloper !== undefined) {
            setAwardDeveloper(data.awardDeveloper);
          }
          if (data.awardMaster !== undefined) {
            setAwardMaster(data.awardMaster);
          }
          if (data.awardDetermined !== undefined) {
            setAwardDetermined(data.awardDetermined);
          }
          if (data.userScore !== undefined) {
            setUserScore(data.userScore);
          }
          if (data.japaneseScore !== undefined) {
            setJapaneseScore(data.japaneseScore);
          }
          if (data.englishScore !== undefined) {
            setEnglishScore(data.englishScore);
          }
        }
      });
    }
  }, [user]);

  return (
    <div className="bg-white min-h-screen">
      <div className={`px-4 py-5 sm:px-6 flex items-center border-b `}>
        <ChevronLeft className="text-gray-400 cursor-pointer" size={24} onClick={onBack} />
        <h2 className="ml-4 text-lg font-medium leading-6 text-gray-900">Analizler (BETA)</h2>
      </div>
      <div>
        <AccountDetailItem 
          icon={<PieChart className="text-blue-500" size={24} />}
          title="Toplam Skor"
          value={userScore}
        />
        <AccountDetailItem 
          icon={<PieChart className="text-green-500" size={24} />}
          title="İngilizce Skor"
          value={englishScore}
        />
        <AccountDetailItem 
          icon={<PieChart className="text-yellow-500" size={24} />}
          title="Japonca Skor"
          value={japaneseScore}
        />
        <hr />
        {awardDeveloper && (
          <AccountDetailItem 
            icon={<Award className="text-blue-500" size={24} />}
            title="Geliştirici Ödülü"
            value="Geliştirici olduğun için bu ödülü kazandın"
          />
        )}
        {awardMaster && (
          <AccountDetailItem 
            icon={<Award className="text-yellow-500" size={24} />}
            title="Usta Ödülü"
            value="10.000 puanı geçerek bu ödülü kazanadın"
          />
        )}
        {awardDetermined && (
          <AccountDetailItem 
            icon={<Award className="text-red-500" size={24} />}
            title="Kararlı Ödül"
            value="15 gün üst üste  giriş yaparak bu ödülü kazandın"
          />
        )}
      </div>
    </div>
  );
};


const ToggleItem = ({ icon, title, description, isEnabled, onToggle, darkMode }) => (
  <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className="flex items-center">
      {icon}
      <div className="ml-4">
        <h3 className={`text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{title}</h3>
        {description && <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>}
      </div>
    </div>
    <div 
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isEnabled ? 'bg-green-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} 
      onClick={onToggle}
    >
      <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isEnabled ? 'translate-x-6' : ''}`} />
    </div>
  </div>
);
const DeveloperOptions = ({ onBack, darkMode, testMode, setTestMode, toggleDarkMode }) => {
  const [currentView, setCurrentView] = useState('main');
  const user = UserIsSignedIn();
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.debugMode !== undefined) {
            setDebugMode(data.debugMode);
          }
        }
      });
    }
  }, [user]);

  const handleToggleDebugMode = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    const userRef = firestore.collection('users').doc(user.uid);
    userRef.update({ debugMode: newDebugMode });
  };

  const handleToggleTestMode = () => {
    const newTestMode = !testMode;
    setTestMode(newTestMode);
    const userRef = firestore.collection('users').doc(user.uid);
    userRef.update({ testMode: newTestMode });
  };

  const darkModeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  let content;
  if (currentView === 'a') {
    content = <AnalyticsDetails onBack={() => setCurrentView('main')} darkMode={darkMode} />;
  } else {
    content = (
      <div className={`${darkModeClass} min-h-screen`}>
        <div className={`px-4 py-5 sm:px-6 flex items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <ChevronLeft className="text-gray-400 cursor-pointer" size={24} onClick={onBack} />
          <h2 className="ml-4 text-lg font-medium leading-6">Geliştirici Seçenekleri</h2>
        </div>
        <div>
          <ToggleItem 
            icon={<Bug className="text-purple-500" size={24} />}
            title="Hata Ayıklama Modu"
            description="Hata raporlarını etkinleştir"
            isEnabled={debugMode}
            onToggle={handleToggleDebugMode}
            darkMode={darkMode}
          />
          <ToggleItem 
            icon={<Terminal className="text-green-500" size={24} />}
            title="Geliştirici olduğunu belirt"
            description="Hesabını geliştirici olarak işaretle"
            isEnabled={testMode}
            onToggle={handleToggleTestMode}
            darkMode={darkMode}
          />
          <ToggleItem 
            icon={<Moon className="text-yellow-500" size={24} />}
            title="Karanlık Mod"
            description="Arayüz renklerini değiştir (BETA)"
            isEnabled={darkMode}
            onToggle={toggleDarkMode}
            darkMode={darkMode}
            disabled={true}
          />
          <SettingsItem 
            icon={<Database className="text-blue-500" size={24} />}
            title="Saklanan Verilerim"
            description="(YAKINDA!)"
            disabled={true}
            darkMode={darkMode}
          />
          <SettingsItem 
            icon={<ToggleLeft className="text-yellow-500" size={24} />}
            title="API Endpoint'leri"
            description="(YAKINDA!)"
            disabled={true}
            darkMode={darkMode}
          />
          {testMode ? (
            <SettingsItem
              icon={<PieChart className="text-blue-500" size={24} />}
              title="Analizlerim"
              description="(Geliştirici modu gerektirir)"
              onClick={() => setCurrentView('a')}
              disabled={false}
              darkMode={darkMode}
            />
          ) : (
            <SettingsItem
              icon={<PieChart className="text-blue-500" size={24} />}
              title="Analizlerim"
              description="(Geliştirici modu gerektirir)"
              disabled={true}
              darkMode={darkMode}
            />
          )}
          <hr className={darkMode ? 'border-gray-700' : 'border-gray-200'} />
          <SettingsItem
            icon={<Info className="text-yellow-500" size={24} />}
            title="Uygulama Sürümü"
            description="Pre-Alpha v0.0.1:4 (14.10.2024)"
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default function Settings() {
  const [currentView, setCurrentView] = useState('main');
  const user = UserIsSignedIn();
  const [darkMode, setDarkMode] = useState(false);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.testMode !== undefined) {
            setTestMode(data.testMode);
          }
          if (data.darkMode !== undefined) {
            setDarkMode(data.darkMode);
          }
        }
      });
    }
  }, [user]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.update({ darkMode: newDarkMode });
    }
  };

  if (!user) {
    return <Loading text={"Bu sayfaya erişmek için hesap oluşturmanız gerekiyor"} />;
  }

  const darkModeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  let content;
  if (currentView === 'account') {
    content = <AccountDetails onBack={() => setCurrentView('main')} darkMode={darkMode} />;
  } else if (currentView === 'developer') {
    content = <DeveloperOptions onBack={() => setCurrentView('main')} darkMode={darkMode} testMode={testMode} setTestMode={setTestMode} toggleDarkMode={toggleDarkMode} />;
  } else {
    content = (
      <div className={`max-w-md mx-auto ${darkModeClass} shadow-sm`}>
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6">Ayarlar</h2>
        </div>
        <div className="border-t border-gray-200">
          <SettingsItem 
            icon={<User className="text-blue-500" size={24} />}
            title="Hesap"
            description="Profil, şifre"
            onClick={() => setCurrentView('account')}
            darkMode={darkMode}
          />
          <SettingsItem 
            icon={<Terminal className="text-gray-500" size={24} />}
            title="Geliştirici Seçenekleri"
            description="Gelişmiş ayarlar"
            onClick={() => setCurrentView('developer')}
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {content}
    </div>
  );
}