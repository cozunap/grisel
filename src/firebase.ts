import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with user's actual config
const firebaseConfig = {
  apiKey: "AIzaSyB4_cQGCJhgWwp38eKatB0rHFqPIGrcMko",
  authDomain: "griselspa.firebaseapp.com",
  projectId: "griselspa",
  storageBucket: "griselspa.firebasestorage.app",
  messagingSenderId: "390820306890",
  appId: "1:390820306890:web:65a7b5344e31f75b04f933"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
