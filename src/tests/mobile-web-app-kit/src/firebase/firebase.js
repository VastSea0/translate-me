// firebase.js
import firebase from 'firebase/compat/app'; // Doğru Firebase modülünü içe aktarın
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  
  
// Firebase'i başlatın
firebase.initializeApp(firebaseConfig);

// Diğer Firebase hizmetlerini de içe aktarın
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// firebase nesnesini de dışa aktarın
export { auth, firestore, storage, firebase };