import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) =>{
    //console.log(action.type)
    switch (action.type) {
        case types.uiSetError:
            return{
                //...state regresa state como lo encuentre
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }
        case types.uiStartLoading:
            return{
                ...state,
                loading: true
            }
        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }
    
        default:
            return state
    }
}