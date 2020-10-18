import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { AuthRouter } from './routers/AuthRouter'
import { store } from './store/store'

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>

        
    )
}
