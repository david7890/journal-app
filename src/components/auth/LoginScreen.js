import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import {startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch()
    //traer info del state
    const {loading, msgError  } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        email: 'correo@gmail.cim',
        password: '123456'
    })

    const {email, password} = formValues

    const handleLogin = (e) =>{
        //evitar propagacion del evento
        e.preventDefault()
        //manejar datos de login
        console.log(email)
        //hacer dispatch
        //login recibe uid, displayNAme
        if (isFormLoginValid()){
            dispatch(startLoginEmailPassword(email, password))
        }
    }

    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin())
    }

    const isFormLoginValid = () =>{
        if (!validator.isEmail(email)){
            dispatch(setError('email is not valid'))
            return false
        }

        dispatch(removeError())
        return true
    }

    return (
        <div>
            <h2 className="auth__title">LoginScreen</h2>
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">

                {
                    //si no es null mostrar caja 
                    msgError && (
                        <div className="auth__alert">
                            {msgError}
                        </div>
                    )
                        
                }

                <input value={email} onChange={handleInputChange} className="auth__input" type="text" placeholder="email" name="email"/>
                <input value={password} onChange={handleInputChange} className="auth__input" type="password" placeholder="password" name="password"/>
                    
                <button disabled={loading} className="butn butn-primary butn-block mt-01" type="submit">
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
