// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCDD4B-tANRwIcD4NiBN0qvKZOIoULQgBI",
  authDomain: "una-avetura-digital.firebaseapp.com",
  projectId: "una-avetura-digital",
  storageBucket: "una-avetura-digital.appspot.com",
  messagingSenderId: "910980658235",
  appId: "1:910980658235:web:ec7e34f949ed42f33bd81e",
  measurementId: "G-XC2QTQR0VY"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);


export default appFireBase;