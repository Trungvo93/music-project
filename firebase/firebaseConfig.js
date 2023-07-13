import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmZ1PKTZRi92DfjOiSlBcxNRaAnkbcf_4",
  authDomain: "music-nextjs13.firebaseapp.com",
  projectId: "music-nextjs13",
  storageBucket: "music-nextjs13.appspot.com",
  messagingSenderId: "153802764429",
  appId: "1:153802764429:web:8ea8982bdb02a108edb2c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
