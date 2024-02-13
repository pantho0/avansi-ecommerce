

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAXRspdkFzy4GvgoyaknNvnANf3d_ijziY",
  authDomain: "task-flare.firebaseapp.com",
  projectId: "task-flare",
  storageBucket: "task-flare.appspot.com",
  messagingSenderId: "64565119087",
  appId: "1:64565119087:web:10ed65aa6d29dff2d1259a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);