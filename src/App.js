import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './containers/Signup/Signup';
import Signin from './containers/Signin/Signin';
import Home from './containers/Home/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/signup' exact={true} component={Signup} />
          <Route path='/signin' exact={true} component={Signin} />
          <Route path='/' exact={true} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
