import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: username });
    
    // Create initial user document in Firestore
    await setDoc(doc(db, "users", res.user.uid), {
      username,
      email,
      createdAt: new Date(),
      hasProfile: false,
      updates: []
    });
    
    return res;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    
    // Check if user document exists, if not create it
    const docRef = doc(db, "users", res.user.uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", res.user.uid), {
        username: res.user.displayName,
        email: res.user.email,
        createdAt: new Date(),
        hasProfile: false,
        updates: []
      });
    }
    
    return res;
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    console.log("AuthContext: Setting up onAuthStateChanged...");
    
    // Safety timeout: Ensure loading is set to false even if Firebase hangs
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("AuthContext: Auth initialization is taking too long, forcing loading to false");
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AuthContext: Auth state changed:", user ? user.email : "No user");
      clearTimeout(timeout);
      
      setCurrentUser(user);
      setLoading(false); // Render children ASAP
      
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          console.log("AuthContext: Fetching user data for:", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            console.log("AuthContext: User data fetched successfully");
          }
        } catch (error) {
          console.error("AuthContext: Firestore fetch error:", error);
        }
      } else {
        setUserData(null);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    googleSignIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
