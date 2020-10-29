import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) =>{
    //cargar notas de firestore
    //url base de datos firestore
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = []

    //snapHijo tiene info de la nota de la db
    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    return notes

}