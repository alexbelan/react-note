import { addDoc, collection, deleteDoc, doc, getDoc, limit, orderBy, query, getDocs, startAfter, updateDoc, DocumentData, Query, QuerySnapshot } from "firebase/firestore";
import { database } from "../utils/firebase";
import { DataNote } from "../interfaces/notes";

export const createNote = async (data: DataNote) => {
    const docRef = await addDoc(collection(database, "notes"), {...data});
    console.log(docRef)
    return docRef
}

export const updateNote = async (id: string, data: DataNote) => {
    const docRef = await updateDoc(doc(database, "notes", id), {...data});
    console.log(docRef)
    return docRef
}

export const deleteNote = async (id: string) => {
    const docRef = await deleteDoc(doc(database, "notes", id));
    console.log('delete docRef', docRef)
}

export const getNote = async (id: string) => {
    return await getDoc(doc(database, "notes", id));
}

export const getNotes = async (limitNum: number, lastVisible: unknown | null) => {
    try {
        const queryRes: Query<DocumentData> = query(collection(database, "notes"), orderBy('datetime'), startAfter(lastVisible), limit(limitNum))
        const docRef: QuerySnapshot<DocumentData> = await getDocs(queryRes)
        return docRef
    } catch (error) {
        
    }
    
}