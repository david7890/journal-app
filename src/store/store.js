import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducers";
import { uiReducer } from "../reducers/uiReducer";

//el store contiene todo el arbol de estado de la aplicacion
//para cambiar el estado es depachando una accion 

const reducers = combineReducers({
    //Reducer es una funcion que determina los cambios en la aplicacion
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

