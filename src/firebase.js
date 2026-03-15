import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuTs0l-kl-Rag9v_RF0IVsd6rahb8PGBI",
  authDomain: "htmllandingpage.firebaseapp.com",
  projectId: "htmllandingpage",
  storageBucket: "htmllandingpage.firebasestorage.app",
  messagingSenderId: "491393192726",
  appId: "1:491393192726:web:40301aebcbff47288bb637",
  measurementId: "G-XYW7BBV6VN"
};

// Initialize Firebase
console.log("Firebase: Initializing app...");
const app = initializeApp(firebaseConfig);

let analytics = null;
try {
  if (typeof window !== 'undefined') {
    console.log("Firebase: Initializing analytics...");
    analytics = getAnalytics(app);
  }
} catch (e) {
  console.warn("Firebase: Analytics failed to initialize", e);
}

console.log("Firebase: Initializing auth and firestore...");
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };

console.log("Firebase: Connected successfully");
export default app;
