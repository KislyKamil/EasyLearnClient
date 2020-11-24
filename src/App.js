import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Hoc/Layout/Layout'
import Login from './containers/Auth/Login'
import Register from './containers/Auth/Register'
import Board from './containers/Board/Board'
import Exam from './containers/Exam/Exam'
import UserPanel from './containers/User/UserPanel'
import SpeechTest from './containers/SpeechTest/SpeechTest'
import TextTest from './containers/TextTest/TextTest'

import { connect } from 'react-redux'
import * as ActionTypes from './store/actions'


class App extends Component {

  render() {

    const REACT_VERSION = React.version;

    console.log(REACT_VERSION)
    this.props.checkStorage();

    let routes = (
      <Switch>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/Login" component={Login} />
        <Route path="/Signup" exact component={Register} />
        <Route path='/Board' exact component={Board} />
        <Route path='/Exam/:id' exact component={Exam} />
        <Route path='/User/:id' exact component={UserPanel} />
        <Route path='/SpeechTest' exact component={SpeechTest} />
        <Route path='/TextTest' exact component={TextTest} />
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


const mapDispatchToProps = dispatch => {
  return {
    checkStorage: () => dispatch({ type: ActionTypes.CHECK_STORAGE }),
  }
}


export default connect(null, mapDispatchToProps)(App);

