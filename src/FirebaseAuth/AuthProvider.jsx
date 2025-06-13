import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';


const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider();

    const [loading, setLoading] = useState(true);

    const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (updatedUserData) => {
        console.log('inside update user', updatedUserData);
        return updateProfile(auth.currentUser, updatedUserData);
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        signInWithPopup(auth, provider);
    }

    

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(()=>{
        const UnSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('inside useeffect after auth state changed', currentUser);
            setLoggedInUser(currentUser);
            setLoading(false);
        });
        return ()=> {
            UnSubscribe();
        }
    }, [])

    const userInfo = {
        createUser,
        signIn,
        googleSignIn,
        updateUser,
        logOut,
        setLoggedInUser,
        loggedInUser,
        loading
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;