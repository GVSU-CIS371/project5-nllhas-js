import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "project5-761a8.firebaseapp.com",
  projectId: "project5-761a8",
  storageBucket: "project5-761a8.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-69X8E41H0C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
