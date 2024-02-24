import React, { createContext, useEffect, useState } from "react";

// import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { NextFn, User, onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  userLoggedIn: false,
  isEmailUser: false,
  currentUser: null,
  setCurrentUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const initializeUser = async (user: User) => {
    if (user) {
      setCurrentUser(user);

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      initializeUser as NextFn<User | null>
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
