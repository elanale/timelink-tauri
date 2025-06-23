// src/components/firebase.ts

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnQxNaXI96BIYtz7QyezGmBnvFaLa0R4U",
  authDomain: "timelink-eee22.firebaseapp.com",
  projectId: "timelink-eee22",
  storageBucket: "timelink-eee22.appspot.com", // ✅ corrected here
  messagingSenderId: "693894477901",
  appId: "1:693894477901:web:436ce31d782eec2ecd4404",
  measurementId: "G-792XZVW5B7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);       // ✅ Export auth
export const db = getFirestore(app);    // ✅ Export Firestore
const analytics = getAnalytics(app);
