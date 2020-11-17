import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { startNewNote } from "../../actions/notes";
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
//en este punto debe estar logeado
//estado de store
const store = mockStore({
    auth: {
        uid: 'testing'
    }
})

describe('Pruebas con las acciones de notes', () => {
    test('debe crear nueva nota startNewNote', async() => {
        await store.dispatch(startNewNote())
        //comprobar si el store tiene las acciones
        const actions = store.getActions()

        expect( actions[0]).toEqual({
            type: types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        expect( actions[1]).toEqual({
            type: types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        //id del registro de la nota dado por firabase
        const docId = actions[0].payload.id
        await db.doc(`/testing/journal/notes/${docId}`).delete()
    })
})

