import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/firebase';

export function UserIsSignedIn() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [setUser]);

    return user;
}

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

    return user ? user.userScore : 'not found data';
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

    return user ? user.email : 'not found data';
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

    return user ? user.displayName : 'not found data';
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

    return user ? user.bio : 'not found data';
}

export function useAddNewUserData(userData) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                setUser(authUser);
                const userRef = firestore.collection('users').doc(authUser.uid);
                await userRef.set(userData, { merge: true }); 
            }
        });

        return () => unsubscribe();
    }, [userData]);

    return user;
}
export function useUpdateUserData(field, value) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                setUser(authUser);
                const userRef = firestore.collection('users').doc(authUser.uid);
                await userRef.update({ [field]: value }); 
            }
        });

        return () => unsubscribe();
    }, [field, value]);

    return user;
}

export function UserFetchSpecificUserData({ field }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                try {
                    const userRef = firestore.collection('users').doc(authUser.uid);
                    const userData = await userRef.get();
                    if (userData.exists) {
                        const user = userData.data();
                        setData(user[field]);
                    } else {
                        console.error('User data does not exist');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.error('No authenticated user');
            }
        });

        return () => unsubscribe();
    }, [field]);

    return data !== null ? <p>Siz bir geliştiricisiniz</p> : 'not found data';
}

export  function UserDarkMode() {
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

    return user ? false : false;
}