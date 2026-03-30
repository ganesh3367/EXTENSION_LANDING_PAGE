import { useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';

function ensureFirebaseConfigured() {
  if (!isFirebaseConfigured || !auth || !db) {
    throw new Error('Firebase is not configured. Add VITE_FIREBASE_* variables.');
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  async function signup(email, password, username) {
    ensureFirebaseConfigured();

    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: username });

    await setDoc(doc(db, 'users', res.user.uid), {
      username,
      email,
      createdAt: serverTimestamp(),
      hasProfile: false,
      updates: [],
    });

    return res;
  }

  function login(email, password) {
    ensureFirebaseConfigured();
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function googleSignIn() {
    ensureFirebaseConfigured();

    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    const docRef = doc(db, 'users', res.user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        username: res.user.displayName || 'User',
        email: res.user.email,
        createdAt: serverTimestamp(),
        hasProfile: false,
        updates: [],
      });
    }

    return res;
  }

  function logout() {
    ensureFirebaseConfigured();
    return signOut(auth);
  }

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      return undefined;
    }

    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) {
        return;
      }

      setCurrentUser(user);
      setLoading(false);

      if (!user) {
        setUserData(null);
        return;
      }

      try {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (mounted) {
          setUserData(docSnap.exists() ? docSnap.data() : null);
        }
      } catch {
        if (mounted) {
          setUserData(null);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      userData,
      loading,
      signup,
      login,
      googleSignIn,
      logout,
    }),
    [currentUser, userData, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
