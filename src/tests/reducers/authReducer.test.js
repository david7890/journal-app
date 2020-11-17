const { authReducer } = require("../../reducers/authReducer")
const { types } = require("../../types/types")
//auth reducer coloca las credenciales en el state
describe('prueba auth ', () =>{
    test('debe realizar el login ', () => {
        const initState = {}
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Fernando'
            }
        }
        const state = authReducer(initState, action)
        expect(state).toEqual({
            uid: 'abc',
            name: 'Fernando'
        })
    })

    test('debe realizar el logout ', () => {
        const initState = {
            uid: 'abc',
            displayName: 'Fernando'
        }
        const action = {
            type:types.logout
        }
        const state = authReducer(initState, action)
        expect(state).toEqual({})
    })    
})