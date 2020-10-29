
import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"

export const startNewNote = () =>{
    return async(dispatch, getState) =>{
        const {uid} = getState().auth

        const newNote = {
            title: '',
            body: '',
            //objeto fecha hoy
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id, newNote))
    }
}

export const activeNote = (id, note) =>({
    //una accion manda a reducer action.type
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) =>{
    return async (dispatch) =>{
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

//establecer notas en store
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

//guardar cambios de nota en firebase
//accion asincrona
export const startSaveNote = (note) =>{
    return async (dispatch, getState) =>{
        //recuperar id del usuario
        const {uid} = getState().auth;
        //si url es undefined
        //quitar propiedad
        if(!note.url){
            delete note.url
        }
        //crear clone del objeto nota 
        const noteToFirestore = {...note}
        //eliminar propiedad id
        delete noteToFirestore.id   
        //actualizar en firestore
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

        dispatch(refreshNote(note.id, noteToFirestore))
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote = (id, note) =>{
    return {
        type: types.notesUpdated, 
        payload:{
            id, 
            note:{
                id,
                ...note
            }
        }
    }
}