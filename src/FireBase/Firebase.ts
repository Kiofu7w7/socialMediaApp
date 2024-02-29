import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCvIcJRqgu2J9F7osG5_oRw8aHly3N9s3o",
    authDomain: "socialmediaapp-cf633.firebaseapp.com",
    projectId: "socialmediaapp-cf633",
    storageBucket: "socialmediaapp-cf633.appspot.com",
    messagingSenderId: "1004151231094",
    appId: "1:1004151231094:web:1b45e0941c1656496d8557",
    measurementId: "G-SLGKX84SLM"
};

export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const dataBase = getFirestore(app);