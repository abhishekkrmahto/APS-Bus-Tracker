// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getFirestore,collection } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBZNpZTEULRNv13Zu4nI9mZ8R-v_MHUwpc",
  authDomain: "school-time-1111.firebaseapp.com",
  projectId: "school-time-1111",
  storageBucket: "school-time-1111.firebasestorage.app",
  messagingSenderId: "172753445723",
  appId: "1:172753445723:web:f8361e00186271ee2a307e",
  measurementId: "G-WEBNLE2TJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const adminCollectionRef = collection(db,"admin")
export const studentCollectionRef = collection(db,"students")
export const driverCollectionRef = collection(db,"drivers")
export const driverPaymentCollectionRef = collection(db,"driverPayment")




const analytics = getAnalytics(app);