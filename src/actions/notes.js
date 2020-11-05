
import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
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
        dispatch(addNewNote(doc.id, newNote))

    }
}

export const activeNote = (id, note) =>({
    //una accion manda a reducer action.type
    type: types.notesActive,
    //nota
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew, 
    payload:{
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
//accion asincrona
export const startUploading = (file) =>{
    return async(dispatch, getState) => {
        const {active: activeNote} = getState().notes

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        //url de la imagen
        const fileUrl = await fileUpload(file)
        //guardar url en la nota activa
        activeNote.url = fileUrl
        //actualizar en firebase
        dispatch(startSaveNote(activeNote))
        Swal.close()
    }
}

export const startDeleting = (id) =>{
    return async(dispatch, getState) =>{
        //uid de usuario
        const uid = getState().auth.uid
        //borra de la base de datos
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id) =>({
        type: types.notesDelete,
        payload: id
    }
)

export const noteLogout = () =>({
    type: types.notesLogoutCleaning,
})