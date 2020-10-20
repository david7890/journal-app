import { firebase, googleAuthProvider } from "../firebase/firebase-config";
const { types } = require("../types/types")

//Accion asincrona
export const startLoginEmailPassword = (email, password) =>{
    //regresa un callback
    //dispatch de thunk
    return (dispatch) =>{
        setTimeout(() => {
            dispatch(login(123,'pedro'))
        }, 3500);
    }
}
//tarea asincrona regresa un callback
export const startRegister = (email, password, name) => {
    return (dispatch) =>{
        //crea y autentica a el usuario
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                //actualizar objeto
                await user.updateProfile({displayName: name})
                console.log(user)

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( e => {
                console.log(e)
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

