import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0NxRWjj0wozQ-eavMwE0uHrks1ejQdmI",
  authDomain: "weather-f2f43.firebaseapp.com",
  projectId: "weather-f2f43",
  storageBucket: "weather-f2f43.firebasestorage.app",
  messagingSenderId: "187969785320",
  appId: "1:187969785320:web:290cb68e1c4063c7e2e85d",
  measurementId: "G-VZF901T8QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
