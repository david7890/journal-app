import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formValues, handleInputChange] = useForm({
        email: 'correo@gmail.cim',
        password: '12345'
    })

    const {email, password} = formValues

    const handleLogin = (e) =>{
        //evitar propagacion del evento
        e.preventDefault()
        //manejar datos de login
        console.log(email)
        //hacer dispatch
        //login recibe uid, displayNAme
        dispatch(startLoginEmailPassword(email, password))

    }

    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin())
    }

    return (
        <div>
            <h2 className="auth__title">LoginScreen</h2>
            <form onSubmit={handleLogin}>
                <input value={email} onChange={handleInputChange} className="auth__input" type="text" placeholder="email" name="email"/>
                <input value={password} onChange={handleInputChange} className="auth__input" type="password" placeholder="password" name="password"/>
                    
                <button  className="butn butn-primary butn-block mt-01" type="submit">
                    Login
                </button>
                <hr className="mt-01"></hr>

                <div className="auth__social">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">
                    Create new account
                </Link>
            </form>

        </div>
    )
}
