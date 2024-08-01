// Importa las funciones necesarias de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Cambiado para mayor claridad

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

// Función para subir archivos
export function uploadFile(file) {
  const storageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Puedes manejar el progreso aquí si lo deseas
      },
      (error) => {
        console.error("Error al subir el archivo:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

// Exportar los módulos necesarios
export { storage, db, appFireBase };
export default appFireBase;
