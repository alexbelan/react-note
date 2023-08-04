import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwZL3egQ6ToFLGu1CJOH1mgJyrw0KLNcQ",
  authDomain: "react-note-f8378.firebaseapp.com",
  projectId: "react-note-f8378",
  storageBucket: "react-note-f8378.appspot.com",
  messagingSenderId: "245973210112",
  appId: "1:245973210112:web:d41988a72128687c5f34e5",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
}

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getFirestore(app);

