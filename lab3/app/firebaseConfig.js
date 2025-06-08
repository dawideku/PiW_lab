import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5JKBwTIWmJ9Kq2jG6xgN51M-5Qn1TqjE",
  authDomain: "piw-laboratorium.firebaseapp.com",
  projectId: "piw-laboratorium",
  storageBucket: "piw-laboratorium.firebasestorage.app",
  messagingSenderId: "414130583380",
  appId: "1:414130583380:web:1810dc9eff138ee2c9fac1"
};

const app = initializeApp(firebaseConfig);

// Eksportujesz potrzebne usługi Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

console.log("Auth and provider loaded", auth, provider);
