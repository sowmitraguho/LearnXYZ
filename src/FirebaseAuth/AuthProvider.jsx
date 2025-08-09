import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';
import axios from 'axios';


const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider();

    const [loading, setLoading] = useState(true);

    const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);

    const addUser = (userData) => {
        setLoading(true);
        // Add user to your database
        axios.post('https://learnxyz-server.onrender.com/user', userData)
            .then(res => {
                console.log('after adding in mogodb', res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (UserData) => {
        const updatedUserData = {
            displayName: UserData.displayName,
            photoURL: UserData.photoURL
        };
        console.log('inside update user', updatedUserData);
        addUser(UserData);
        setLoading(true);
        return updateProfile(auth.currentUser, updatedUserData);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        signInWithPopup(auth, provider);
    }

    

    const logOut = () => {
        setLoading(true);
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
        setLoading,
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