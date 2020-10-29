import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegister } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    //obtner informacion del state
    const {msgError} = useSelector( state => state.ui )

    //manejar formualrio
    const [formValues, handleInputChange] = useForm({
        name: 'Karen',
        email: 'correo@mail.com',
        password: '123456',
        password2: '123456',
        blood: 'o+'
    })

    const {name, email, password, password2, blood} = formValues

    const handleRegister = (e) =>{
        e.preventDefault()
        if(isFormValid ()){
            dispatch(startRegister(email, password, name))
        }
    }

    const isFormValid = () =>{
        //npm validator
        if(name.trim().length === 0){
            console.log('name is required')
            //despachar accion actions/ui
            dispatch(setError('name is required'))
            return false
        }else if(!validator.isEmail(email)){
            console.log('email is not valid')
            dispatch(setError('email is not valid'))
            return false
        }else if(password !== password2 || password.length < 5){
            console.log('error')
            dispatch(setError('Error las contraseñas no coinciden'))
           return false 
        }

        dispatch(removeError())
        return true
    } 

    return (
        <div>
            <h2 className="auth__title">Register Screen</h2>
            <form onSubmit={handleRegister}>

                {
                    //si no es null mostrar caja 
                    msgError && (
                        <div className="auth__alert">
                            {msgError}
                        </div>
                    )
                    
                }
                
                <input onChange={handleInputChange} value={name} className="auth__input" type="text" placeholder="Name" name="name"/>
                <input onChange={handleInputChange} value={email} className="auth__input" type="text" placeholder="Email" name="email"/>
                <input onChange={handleInputChange} value={password} className="auth__input" type="password" placeholder="password" name="password"/>
                <input onChange={handleInputChange} value={password2} className="auth__input" type="password" placeholder="Confirm password" name="password2"/>
                <input onChange={handleInputChange} value={blood} className="auth__input" type="text" placeholder="Blood Type" name="blood"/>
                    
                <button  className="butn butn-primary butn-block mt-01" type="submit">
                    Register
                </button>
                <hr className="mt-01"></hr>

                <div className="auth__social">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/login">
                    Already registered?
                </Link>
            </form>

        </div>
    )
}
