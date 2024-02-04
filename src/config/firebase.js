// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA35L53fAewUfCMVWOyMs3RbNOK_ORmZoI",
  authDomain: "contacts-af827.firebaseapp.com",
  projectId: "contacts-af827",
  storageBucket: "contacts-af827.appspot.com",
  messagingSenderId: "140146767876",
  appId: "1:140146767876:web:f2aba6181cbe27259f1d51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);