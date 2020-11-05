import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { noteLogout } from "./notes";
import { finishLoading, startLoading } from "./ui";
const { types } = require("../types/types")

//Accion asincrona
export const startLoginEmailPassword = (email, password) =>{
    //regresa un callback
    //dispatch de thunk
    //dispatch manda acciones a reducers
    return (dispatch) =>{

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( ({user}) =>{
            dispatch(login(user.uid, user.displayName))

            dispatch(finishLoading())
        })
        .catch( e => {
            console.log(e)
            //loading: false si falla login
            dispatch(finishLoading())
            //alerta error
            Swal.fire('Error', e.message, 'error')
        })
    }
}
//tarea asincrona regresa un callback
export const startRegister = (email, password, name) => {
    return (dispatch) =>{
        //crea y autentica a el usuario
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                //actualizar objeto para agregar displayname
                await user.updateProfile({displayName: name})
                console.log(user)

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startGoogleLogin = () =>{
    //Calback
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({user}) =>{
                console.log(user)
                login(user.uid, user.displayName)
            })
            //manejar error
    }

}

export const login = (uid, displayName) =>{
    return{
        type: types.login,
        payload:{
            uid, 
            displayName
        }
    }
}
//Accion asincrona
export const startLogout = () =>{
    return async(dispatch) =>{
        //esperar a que se ejcute
        await firebase.auth().signOut();
        //cuando termine de ejecutar
        dispatch(logout())
        dispatch(noteLogout())

    }
}


export const logout = () =>({
    //thunk manda a reducers authreducer regresa objeto vacio
    type: types.logout
})