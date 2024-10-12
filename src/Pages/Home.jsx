import React, { useState, useEffect } from 'react';
import { auth, firestore, firebase } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
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

    return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Home Page</h2>
        <p className="mt-4">Welcome, {user ? user.displayName : 'Guest'}</p>
       
        <p>Click the button below to start learning languages.</p>
        <button className="btn btn-primary mt-4" onClick={()=> {navigate("/playground")}}>PlayGround</button>
      </div>
    </div>
    );
};