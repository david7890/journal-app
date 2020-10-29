import { types } from "../types/types";
//acciones modifican el state 
//retorna un objeto
export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () =>({
    type: types.uiRemoveError
})
//Acciones sincronas
export const startLoading = () =>({
    type: types.uiStartLoading
})
     
export const finishLoading = () =>({
    type: types.uiFinishLoading
})

