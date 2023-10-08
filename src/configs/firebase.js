import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCMElM6mwvwomsI1ObajwCrcG6Skq7PNNE",
    authDomain: "tracle-project.firebaseapp.com",
    projectId: "tracle-project",
    storageBucket: "tracle-project.appspot.com",
    messagingSenderId: "535088995299",
    appId: "1:535088995299:web:9d722bf77abd6497395ed6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;