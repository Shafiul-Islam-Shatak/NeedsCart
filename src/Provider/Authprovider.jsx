import { createContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../Firebase/firebase.cofig';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Registration function
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login function
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google login function
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    return (
        <AuthContext.Provider value={{ user, createUser, logIn, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
