import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC6k53DvVxkXMlycE14lY0hCRLutxiIxzI",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fir-kanban-db797.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-kanban-db797",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fir-kanban-db797.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "560325260432",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:560325260432:web:7f962efb948a1d7b1b1415"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт сервисов
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;