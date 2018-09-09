import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import Get from './get';
import {
    BrowserRouter,
    Route, 
    Switch
} from "react-router-dom";
ReactDOM.render( 
<BrowserRouter>
    <Switch>
        <Route exact path='/' name='index' component={Login} />
        <Route exact path='/login' name='Login' component={Login} />
        <Route exact path='/signup' name='signup' component={Signup} />
        <Route exact path='/get' name='get' component={Get} /> 
        <Route path='/profile' name='profile' component={Profile} />
    </Switch>
</BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();
