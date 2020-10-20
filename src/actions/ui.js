import { types } from "../types/types";
//retorna un objeto
export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () =>({
    type: types.uiRemoveError
})