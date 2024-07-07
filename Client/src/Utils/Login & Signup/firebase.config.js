import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD4tshzfgQU6Sf7mLi2ZnVK2_q-hHltoQw",
  authDomain: "enova-fashion.firebaseapp.com",
  projectId: "enova-fashion",
  storageBucket: "enova-fashion.appspot.com",
  messagingSenderId: "441480405403",
  appId: "1:441480405403:web:f562df82634fa2e0a5c13e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
