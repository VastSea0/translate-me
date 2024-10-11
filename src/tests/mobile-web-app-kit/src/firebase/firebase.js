// firebase.js
import firebase from 'firebase/compat/app'; // Doğru Firebase modülünü içe aktarın
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAgjb9v0LS5AtjIKr_6ejWkvPVdvubIHXY",
    authDomain: "opensodaproject.firebaseapp.com",
    projectId: "opensodaproject",
    storageBucket: "opensodaproject.appspot.com",
    messagingSenderId: "364099706420",
    appId: "1:364099706420:web:6d39db2bff04a3af6ff461",
    measurementId: "G-E7ZWYC9NJV"
  };
  
  
// Firebase'i başlatın
firebase.initializeApp(firebaseConfig);

// Diğer Firebase hizmetlerini de içe aktarın
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// firebase nesnesini de dışa aktarın
export { auth, firestore, storage, firebase };