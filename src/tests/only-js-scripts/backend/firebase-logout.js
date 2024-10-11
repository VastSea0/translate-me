import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase config ayarlarını buraya ekleyin
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase'i başlat
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const App = () => {
    const handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('Oturum başarıyla kapatıldı.');
            })
            .catch((error) => {
                console.error('Oturum kapatma hatası:', error);
            });
    };

    return (
        <div>
            <h1>Firebase Logout Örneği</h1>
            <button onClick={handleLogout}>Oturumu Kapat</button>
        </div>
    );
};

export default App;