// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPnkos-gR4M3rLJZTVOQImntgjlFmc0aI",
  authDomain: "fahari-store.firebaseapp.com",
  projectId: "fahari-store",
  storageBucket: "fahari-store.appspot.com",
  messagingSenderId: "1019832248411",
  appId: "1:1019832248411:web:71255e7e518051ad1df77e",
  measurementId: "G-31FG616THQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Authentication
const db = getFirestore(app);  // Firestore Database
const analytics = getAnalytics(app);  // Firebase Analytics (optional)

// Export the necessary Firebase services
export { auth, db, analytics };
