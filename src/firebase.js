import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCuTs0l-kl-Rag9v_RF0IVsd6rahb8PGBI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'htmllandingpage.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'htmllandingpage',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'htmllandingpage.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '491393192726',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:491393192726:web:40301aebcbff47288bb637',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-XYW7BBV6VN',
};

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingConfig = requiredKeys.filter((key) => !firebaseConfig[key]);
export const isFirebaseConfigured = missingConfig.length === 0;

if (!isFirebaseConfigured) {
  console.error(`Missing Firebase config keys: ${missingConfig.join(', ')}`);
}

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

let analytics = null;
if (app && typeof window !== 'undefined' && firebaseConfig.measurementId) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export { analytics };
export default app;
