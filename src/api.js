import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"
//      firebase/firestore -> for realtime version


const firebaseConfig = {
  apiKey: "AIzaSyDpKUbLidrNDcRuYe0YN3XrvFcl9JLXTMU",
  authDomain: "vanlife-c95f8.firebaseapp.com",
  projectId: "vanlife-c95f8",
  storageBucket: "vanlife-c95f8.appspot.com",
  messagingSenderId: "974164381621",
  appId: "1:974164381621:web:4a6c742e100880d62c53fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans") //get reference of collection of doc




export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef) // get array of doc
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id) // get reference of single doc
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}