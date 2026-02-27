import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoLZjf6CqAHql_wooOjW_aciRQL6SdaSY",
  authDomain: "queek-prototype.firebaseapp.com",
  projectId: "queek-prototype",
  storageBucket: "queek-prototype.firebasestorage.app",
  messagingSenderId: "23453157022",
  appId: "1:23453157022:web:e205198371fc61248a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);