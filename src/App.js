import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './Hoc/Layout/Layout'
import Login from './containers/Auth/Login'
import Register from './containers/Auth/Register'
import Board from './containers/Board/Board'

class App extends Component {

  render() {

    let routes = (
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Signup" exact component={Register} />
        <Route path='/Board' exact component={Board} />
        <Redirect to="/" />
      </Switch>
    )
    return (
      <div className="app">
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}



export default App;

