import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';
import axios from 'axios';


const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider();
    
    const [loading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);

    //add  user to  database
    const addUser = (userData) => {
        setLoading(true);
        axios.post(`${import.meta.env.VITE_SERVER_URL}user`, userData)
            .then(res => {
                console.log('after adding in mogodb', res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //get user from database
    const getUser = (email) => {
        setLoading(true);
        return axios.get(`${import.meta.env.VITE_SERVER_URL}user/${email}`)
            .then(res => {
                console.log('User fetched from database', res.data);
                return res.data;
            })
            .catch(error => {
                console.log(error);
                return null;
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
            //setLoading(true);
            if (currentUser) {
                getUser(currentUser.email)
                    .then(userData => {
                        console.log('User data from database:', userData);
                        setLoggedInUser(userData);
                    });
            } else {
                setLoggedInUser(null);
            }
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