const { createStore, combineReducers } = require("redux");
const { authReducer } = require("../reducers/authReducer");

const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(reducers)