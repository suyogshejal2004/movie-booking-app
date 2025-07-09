// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Firebase Config (same as you got)
const firebaseConfig = {
  apiKey: "AIzaSyBJebS7XTFM2HZM2tuMH__uaNJQF6IToCs",
  authDomain: "mymovieapp-b4274.firebaseapp.com",
  projectId: "mymovieapp-b4274",
  storageBucket: "mymovieapp-b4274.appspot.com",  // ✅ fixed typo: was "firebasestorage.app"
  messagingSenderId: "593298140855",
  appId: "1:593298140855:web:60bbf9dca74aae57a6a732",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Get Firebase Auth instance
export const auth = getAuth(app);
