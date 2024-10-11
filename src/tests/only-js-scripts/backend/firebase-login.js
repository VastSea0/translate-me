import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase konfigürasyonunuzu buraya ekleyin
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
    useEffect(() => {
        // Firebase auth durumunu izleyin
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('User signed in: ', user);
            } else {
                console.log('No user signed in');
            }
        });
    }, []);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log('User signed in: ', result.user);
            })
            .catch(error => {
                console.error('Error signing in: ', error);
            });
    };

    return (
        <div>
            <h1>Google ile Oturum Aç</h1>
            <button onClick={signInWithGoogle}>Google ile Giriş Yap</button>
        </div>
    );
};

export default App;