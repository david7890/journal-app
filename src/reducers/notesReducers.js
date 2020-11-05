import { types } from "../types/types";

/*state notas:
    {
        notes:[],
        active: {
            id: 'firebase',
            title:'',
            body: '',
            image: '',
            date: 
        }
    }
*/
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return{
                //regresar el state anterior
                ...state,
                active:{
                    ...action.payload
                }
            }
        case types.notesAddNew:
            return{
                ...state,
                ///action.payload pone nota al principio
                //...state.notes crea una copia de las notas
                notes: [action.payload, ...state.notes]
            }

        case types.notesLoad:
            //console.log(action.payload)
            return{
                ...state,
                //action.payload es un arreglo
                //establecer notas en el store
                notes: [...action.payload]
            }
        //actualizar notas en sidebar
        case types.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    //encuentra la nota actualizada
                    note => note.id === action.payload.id
                        //actualiza
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                //arreglo vacio
                notes: []
            }
        default:
            return state;
    }
}