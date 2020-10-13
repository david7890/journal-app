import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <div>
            <h2 className="auth__title">Register Screen</h2>
            <form>
                <input className="auth__input" type="text" placeholder="Name" name="name"/>
                <input className="auth__input" type="text" placeholder="Email" name="email"/>
                <input className="auth__input" type="password" placeholder="password" name="password"/>
                <input className="auth__input" type="password" placeholder="Confirm password" name="password2"/>
                <input className="auth__input" type="text" placeholder="Blood Type" name="blood"/>
                    
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
