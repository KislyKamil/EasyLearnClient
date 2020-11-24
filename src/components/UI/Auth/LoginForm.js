import React from 'react'
import BasicForm from './BasicForm'
import Button from '../Button/Button'
import { NavLink } from 'react-router-dom'
import SubmitButton from '../Button/SubmitButton'

const loginForm = props => {

    let buttons = (
        <div>
            <SubmitButton text='Zaloguj' />

            <NavLink to='/Signup' exact>
                <Button text='Załóż konto' />
            </NavLink>
        </div>
    )
    
    return (
        <BasicForm
            buttons={buttons}
            login={props.login}
            password={props.password}
            submit={props.submit}
            onLoginChange={props.onLoginChange}
            onPasswordChange={props.onPasswordChange}
        />
    )
}

export default loginForm