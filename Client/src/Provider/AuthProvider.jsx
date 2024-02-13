import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Utils/Login & Signup/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () =>{
    return signOut(auth)
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("checking the user from auth state", currentUser?.email);
      if (currentUser) {
        setLoading(false);
        
      }
    });
    return () => {
      return unsubscribe();
    };
  },[]);

  const authInfo = {
    user,
    loading,
    login,
    createUser,
    logOut

  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
