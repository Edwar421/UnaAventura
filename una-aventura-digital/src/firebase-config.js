// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';



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

// Inicializa Firebase Storage y Firestore
const storage = getStorage(appFireBase);
const db = getFirestore(appFireBase);

export function UploadFile(file){
    const storageRef   = ref(storage, v4());
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }
  )
}

export {storage, db};
export default appFireBase;