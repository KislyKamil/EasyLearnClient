import React from 'react'
import './Form.css'


const basicForm = (props) => {

    return (
        <div className="body">
            <div className="container-md">
                <div className="form">
                    <form onSubmit={props.submit}>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="input-group mb-2" >
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">Nazwa użytkownika</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nazwa użytkownika"
                                        aria-label="Username" aria-describedby="addon-wrapping"
                                        onChange={props.login}
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">Hasło</span>
                                    </div>
                                    <input type="password" className="form-control"
                                        placeholder="password" aria-label="Username" aria-describedby="addon-wrapping"
                                        onChange={props.password}
                                    />
                                </div>
                                {props.extras}
                            </div>
                        </div>
                        {props.buttons}
                    </form>
                </div>
            </div>

        </div>
    )
}

export default basicForm