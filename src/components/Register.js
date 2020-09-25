import React from 'react';


class Register extends React.Component {

    state = {

        login: "",
        password: "",
        email: ""

      };

      onLoginChange = e => {
        this.setState({
          login: e.target.value
        });
        console.log(e.target.value)
      };

      onPasswordChange = e => {
        this.setState({
          password: e.target.value
        });
        console.log(e.target.value)
      };
      onEmailChange = e => {
        this.setState({
          email: e.target.value
        });
        console.log(e.target.value)
      };
   // const registerData = new FormData();

   handleSubmit = (e) => {
       
    e.preventDefault();

    fetch('http://localhost:8080/register-user',{
        
        method:"POST",
        body: JSON.stringify({
         
            login: this.state.login,
            password: this.state.password,
            email:this.state.email,  
        }),
        headers:{
            "Content-Type": "application/json"
        }
        }).then((response)=>{
        
        console.log(response.text);

        })

   }

  
    render() {
    return (
    <div className="body">
        <div className="container-md">
            <form>
                <div className="row">
                     <div className="col-sm-5">
                        <div className="input-group mb-2">
                         <div className="input-group-prepend">
                             <span className="input-group-text" id="addon-wrapping">Nazwa użytkownika</span>
                         </div>
                            <input onChange={this.onLoginChange} value={this.state.login} type="text" id="login" className="form-control" placeholder="Nazwa użytkownika" aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="addon-wrapping">Hasło</span>
                         </div>
                            <input onChange={this.onPasswordChange} value={this.state.password} type="password" id="password" className="form-control" placeholder="Hasło" aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>
                        <div className="input-group mb-2">
                         <div className="input-group-prepend">
                             <span className="input-group-text" id="addon-wrapping">Adres email</span>
                         </div>
                            <input onChange={this.onEmailChange} value={this.state.email}type="text" id="email" className="form-control" placeholder="example@mail.com" aria-label="email" aria-describedby="addon-wrapping" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">                
                          
                        <input type="submit" className="btn btn-dark btn-md btn-block" value="Zarejestruj się" />                       
                    </div>                                
                </div>
            </form>
           
        </div>    
    </div>
    )
   }
}
    
export default Register;