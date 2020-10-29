import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen';

import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    //useEffect se ejecuta una vez
    //mantiene el estado del login al recargar
    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) =>{
            //console.log(user)
            //si existe uid
            if(user?.uid){
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                dispatch(startLoadingNotes(user.uid))
            }else{
                setIsLoggedIn(false)
            }
            //termino de comprobar si usuario esta autenticado
            setChecking(false)
        })
    }, [dispatch, setChecking, setIsLoggedIn])

    //termino de comprobar si usuario esta autenticado
    if(checking){
        return(
            <h1>Espere ...</h1>
        )
    }
 
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
