import React from 'react';


const Login = () => {

    const signIn = () => {
        
    }
    return(
    <div className="body">
        <div className="container-md">
            <div className="row">
                <div className="col-sm-4">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="addon-wrapping">Nazwa użytkownika</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Nazwa użytkownika" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="addon-wrapping">Hasło</span>
                        </div>
                        <input type="password" className="form-control" placeholder="password" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-5">
                    <p>Zaloguj się</p>                   
                    <button className="btn btn-dark"  onClick={signIn}>Załóż konto</button>                          
                </div>
                
            </div>
        </div>       
    </div>
    )
}
    
export default Login;