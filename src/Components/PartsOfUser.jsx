import React, { useEffect , useState} from 'react';
import { auth, firestore } from '../firebase/firebase';

export function UserScore() {
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
    }, [setUser]);

    return user ? user.userScore : 'not found data'
  
}

export function UserMail() {
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
    }, [setUser]);

    return user ? user.email : 'not found data'
   
}

export function UserDisplayName() {
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
    }, [setUser]);

    return user ? user.displayName : 'not found data'
}

export function UserBio() {
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
    }, [setUser]);

    return user ? user.bio : 'not found data'
}