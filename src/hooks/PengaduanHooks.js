import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { generateRandomString } from "../helpers/helper";
import db from "../configs/firebase";

export const GetPengaduan = async () => {
    try {
        const pengaduanCollection = collection(db, 'pengaduan');
        const snapshot = await getDocs(pengaduanCollection);
        const pengaduans = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return pengaduans;
    } catch (error) {
        console.log(error);
        alert('Maaf terjadi kesalahan');
    }
};

export const GetPengaduanByUserId = async (id) => {
    try {
        const pengaduanCollection = collection(db, 'pengaduan');
        const pengaduanQuery = query(pengaduanCollection, where('pengaduan_users_id', '==', id));
        const snapshot = await getDocs(pengaduanQuery);
        const pengaduan = snapshot.docs.map(doc => doc.data());
        return pengaduan;
    } catch (error) {
        console.log(error);
    }
};

export const GetPengaduanById = async (id) => {
    try {
        const pengaduanCollection = collection(db, 'pengaduan');
        const pengaduanQuery = query(pengaduanCollection, where('pengaduan_id', '==', id));
        const snapshot = await getDocs(pengaduanQuery);
        const pengaduan = snapshot.docs.map(doc => doc.data());
        return pengaduan;
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};

export const PostPengaduan = async (user, nama, alamat, keluhan, gambar) => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, gambar.name);
        await uploadBytes(storageRef, gambar);
        const imageUrl = await getDownloadURL(storageRef);

        const newPengaduan = {
            pengaduan_id: generateRandomString(16),
            pengaduan_users_id: user,
            pengaduan_nama: nama,
            pengaduan_alamat: alamat,
            pengaduan_kelurahan: 'Kelurahan Rawasari',
            pengaduan_keluhan: keluhan,
            pengaduan_gambar: imageUrl,
            pengaduan_status: 'pending'
        };

        const pengaduanCollection = collection(db, 'pengaduan');
        await addDoc(pengaduanCollection, newPengaduan);
        alert('Pengaduan berhasil dikirim!');
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};

export const PatchPengaduanProcess = async (id) => {
    const updatedPengaduan = {
        pengaduan_status: 'process'
    };
    
    try {
        const pengaduanDoc = doc(db, 'pengaduan', id);
        await updateDoc(pengaduanDoc, updatedPengaduan);
        alert('Pengaduan berhasil di proses!');
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};

export const PatchPengaduanSuccess = async (id) => {
    const updatedPengaduan = {
        pengaduan_status: 'success'
    };
    
    try {
        const pengaduanDoc = doc(db, 'pengaduan', id);
        await updateDoc(pengaduanDoc, updatedPengaduan);
        alert('Pengaduan berhasil ditangani!');
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};

export const DeletePengaduan = async (id, gambar) => {
    try {
        const pengaduanDoc = doc(db, 'pengaduan', id);
        await deleteDoc(pengaduanDoc);
        const storage = getStorage();
        const storageReff = ref(storage, gambar);
        await deleteObject(storageReff);
        alert('Aduan berhasil dihapus');
    } catch (error) {
        console.log(error);
        alert('Maaf, telah terjadi kesalahan!');
    }
};