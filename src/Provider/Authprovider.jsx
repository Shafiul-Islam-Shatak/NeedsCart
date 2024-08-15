import { useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.cofig";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider } from "firebase/auth";
// import axios from 'axios'





const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login with email and pass
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logOut =async () => {
        setLoading(true);
        await axios(`${import.meta.env.VITE_API_URL}/logout` , {
            withCredentials: true
        })
        return signOut(auth);
    }
    // onAtuh setup
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unSubscribe();
        }
    }, [])

    // update profile
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })

    }

    const authInfo = {
        user,
        createUser,
        logOut,
        logIn,
        loading,
        googleLogin,
        updateUserProfile,
        setUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.object.isRequired
}


export default AuthProvider;