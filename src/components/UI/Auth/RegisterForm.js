import React from 'react'
import BasicForm from './BasicForm'
import SubmitButton from '../Button/SubmitButton'

const loginForm = props => {

    let email = (
        <div className="input-group mb-2">
            <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">Adres email</span>
            </div>
            <input type="text" id="email" className="form-control" placeholder="example@mail.com"
                aria-label="email" aria-describedby="addon-wrapping" onChange={props.email} />
        </div>
    )
    let buttons = (
        <div>
            <SubmitButton text='Załóż konto' />
        </div>


    )
    return (
        <BasicForm
            buttons={buttons}
            extras={email}
            submit={props.submit}
            login={props.login}
            password={props.password}
        />
    )
}

export default loginForm


