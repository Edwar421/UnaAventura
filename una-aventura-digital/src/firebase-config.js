// Importa las funciones necesarias de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyCDD4B-tANRwIcD4NiBN0qvKZOIoULQgBI",
  authDomain: "una-avetura-digital.firebaseapp.com",
  projectId: "una-avetura-digital",
  storageBucket: "una-avetura-digital.appspot.com",
  messagingSenderId: "910980658235",
  appId: "1:910980658235:web:ec7e34f949ed42f33bd81e",
  measurementId: "G-XC2QTQR0VY"
};

// Inicializa Firebase
const appFireBase = initializeApp(firebaseConfig);

// Inicializa Firebase Storage y Firestore
const storage = getStorage(appFireBase);
const db = getFirestore(appFireBase);

export function UploadFile(file) {
  const storageRef = ref(storage, `images/${v4()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return uploadTask;
}

export { storage, db };
export default appFireBase;
