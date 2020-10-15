import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import { connect } from 'react-redux';

function App({ isAuthenticated }) {
  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/dashboard'
          render={() =>
            isAuthenticated ? <Dashboard /> : <Redirect to='/login' />
          }
        />
        <Route
          exact
          path='/login'
          render={() => (!isAuthenticated ? <Login /> : <Redirect to='/' />)}
        ></Route>
        <Route exact path='/' component={Home}></Route>
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mapStateToProps)(App);
