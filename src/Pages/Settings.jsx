import React, { useState, useEffect } from 'react';
import { ChevronRight, Moon, Bell, Lock, PieChart, Info, User, Smartphone, ChevronLeft, Mail, Terminal, ToggleLeft, Database, Bug , Award} from 'lucide-react';
import { UserScore, UserMail, UserDisplayName, UserIsSignedIn, useAddNewUserData, UserFetchSpecificUserData } from '../Components/PartsOfUser';
import Loading from '../Components/Loading';
import { firestore } from '../firebase/firebase';


const SettingsItem = ({ icon, title, description, onClick, disabled }) => (
  <div 
    className={`flex items-center justify-between p-4 border-b border-gray-200 ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}`} 
    onClick={disabled ? undefined : onClick}
  >
    <div className="flex items-center">
      {React.cloneElement(icon, { className: `${icon.props.className} ${disabled ? 'opacity-50' : ''}` })}
      <div className="ml-4">
        <h3 className={`text-base font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>{title}</h3>
        {description && <p className={`text-sm ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>}
      </div>
    </div>
    {!disabled && <ChevronRight className="text-gray-400" size={20} />}
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
      <div className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
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

const ToggleItem = ({ icon, title, description, isEnabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center">
      {icon}
      <div className="ml-4">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
    <div 
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`} 
      onClick={onToggle}
    >
      <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isEnabled ? 'translate-x-6' : ''}`} />
    </div>
  </div>
);
const DeveloperOptions = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');
  const user = UserIsSignedIn();
  const [debugMode, setDebugMode] = useState(false);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.debugMode !== undefined) {
            setDebugMode(data.debugMode);
          }
          if (data.testMode !== undefined) {
            setTestMode(data.testMode);
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

  let content;
  if (currentView === 'a') {
    content = <AnalyticsDetails onBack={() => setCurrentView('main')} />;
  } else {
    content = (
      <div className="bg-white min-h-screen">
      <div className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
        <ChevronLeft className="text-gray-400 cursor-pointer" size={24} onClick={onBack} />
        <h2 className="ml-4 text-lg font-medium leading-6 text-gray-900">Geliştirici Seçenekleri</h2>
      </div>
      <div>
        <ToggleItem 
          icon={<Bug className="text-purple-500" size={24} />}
          title="Hata Ayıklama Modu"
          description="Hata raporlarını etkinleştir"
          isEnabled={debugMode}
          onToggle={handleToggleDebugMode}
        />
        <ToggleItem 
          icon={<Terminal className="text-green-500" size={24} />}
          title="Geliştirici olduğunu belirt"
          description="Hesabını geliştirici olarak işaretle"
          isEnabled={testMode}
          onToggle={handleToggleTestMode}
        />
        <SettingsItem 
          icon={<Database className="text-blue-500" size={24} />}
          title="Saklanan Verilerim"
          description="(YAKINDA!)"
          disabled={true}
        />
        <SettingsItem 
          icon={<ToggleLeft className="text-yellow-500" size={24} />}
          title="API Endpoint'leri"
          description="(YAKINDA!)"
          disabled={true}
        />
      {
        testMode ? (
          <SettingsItem
            icon={<PieChart className="text-blue-500" size={24} />}
            title="Analizlerim"
            description="(Geliştirici modu gerektirir)"
            onClick={() => setCurrentView('a')}
            disabled={false}
          />
        ) : (
          <SettingsItem
            icon={<PieChart className="text-blue-500" size={24} />}
            title="Analizlerim"
            description="(Geliştirici modu gerektirir)"
            disabled={true}
          />
        )
      }
        <hr />
        <SettingsItem
          icon={<Info className="text-yellow-500" size={24} />}
          title="Uygulama Sürümü"
          description="Pre-Alpha v0.0.1:4 (14.10.2024)"
        />
      </div>
    </div>
    );
  }


  return (
    <>
    {content}
    </>
   
  );  
};

export default function Settings() {
  const [currentView, setCurrentView] = useState('main');
  const user = UserIsSignedIn();

  if (!user) {
    return <Loading text={"Bu sayfaya erişmek için hesap oluşturmanız gerekiyor"} />;
  }

  let content;
  if (currentView === 'account') {
    content = <AccountDetails onBack={() => setCurrentView('main')} />;
  } else if (currentView === 'developer') {
    content = <DeveloperOptions onBack={() => setCurrentView('main')} />;
  
  }
  else {
    content = (
      <div className="max-w-md mx-auto bg-white shadow-sm">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Ayarlar</h2>
        </div>
        <div className="border-t border-gray-200">
          <SettingsItem 
            icon={<User className="text-blue-500" size={24} />}
            title="Hesap"
            description="Profil, şifre"
            onClick={() => setCurrentView('account')}
          />
          <SettingsItem 
            icon={<Terminal className="text-gray-500" size={24} />}
            title="Geliştirici Seçenekleri"
            description="Gelişmiş ayarlar"
            onClick={() => setCurrentView('developer')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {content}
    </div>
  );
}