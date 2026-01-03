import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let auth;
let storage;
let googleProvider;
let analytics;

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId"
] as const;

const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  console.error("Missing Firebase configuration keys:", missingKeys.join(", "));
  console.error("Please add them to your .env file.");
} else {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Firebase initialization error. Check your environment variables.", error);
  }
}

export { auth, storage, googleProvider, analytics };
