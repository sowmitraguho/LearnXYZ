import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';


const AuthProvider = ({children}) => {

     const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (updatedUserData) => {
        console.log('inside update user', updatedUserData);
        return updateProfile(auth.currentUser, updatedUserData);
    }


    const userInfo = {
        createUser,
        updateUser
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;