// Importa las funciones necesarias de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
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
export function UploadFile(file) {
  const storageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      // Puedes manejar el progreso aquí si lo deseas
    }, 
    (error) => {
      console.error("Error al subir el archivo:", error);
      throw error; // Lanza el error para manejarlo en el lugar donde se llama a esta función
    }, 
    () => {
      // Manejo de la finalización de la carga si es necesario
    }
  );

  return uploadTask;
}

// Exportar los módulos necesarios
export { storage, db };
export default appFireBase;