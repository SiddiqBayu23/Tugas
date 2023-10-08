import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "../configs/firebase";
import { generateRandomString } from "../helpers/helper";


export const GetUserByEmail = async (email) => {
    try {
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('users_email', '==', email));
        const snapshot = await getDocs(userQuery);
        const user = snapshot.docs.map(doc => doc.data());
        return user;
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};

export const PostUser = async (email, password) => {
    const newUser = {
        users_id: generateRandomString(16),
        users_email: email,
        users_password: password,
        users_isAdmin: false
    };
    
    try {
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, newUser);
        alert('Registrasi berhasil dilakukan!');
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};