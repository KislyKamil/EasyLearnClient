import React from 'react'


const UserSettings = (props) => {

    return (
        <div className="details">

            <div className="details-change">
                <div className="detail-box">
                    <p>Zmien nazwe uzytkownia</p>
                    <input type="text" id="login" value={props.login} onChange={props.change} onFocus={props.focus} placeholder="nowy login" />
                </div>
                <div className="detail-box">
                    <p>Zmien haslo</p>
                    <div>
                        <input type="password" id="password" value={props.password} onChange={props.change} onFocus={props.focus} placeholder="nowe haslo" />
                    </div>
                    <div>
                        <input type="password" id="passwordAgain" value={props.passwordAgain} onChange={props.change} onFocus={props.focus} placeholder="potwierdz haslo" />
                    </div>

                </div>

                <div className="detail-box">
                    <p>Zmien adres email</p>
                    <input id="email" type="email" value={props.email} onChange={props.change} onFocus={props.focus} placeholder="nowy adres email" />
                </div>

                <button class="zt-btn"> Zatwierdz zmiany </button>

            </div>





        </div>

    )
}

export default UserSettings