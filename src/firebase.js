// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration for your project
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
const db = getFirestore(app); // Firestore for database
const auth = getAuth(app); // Firebase Authentication
const analytics = getAnalytics(app); // Firebase Analytics (optional)

// Export the services to use throughout your app
export { db, auth, analytics };
