import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';


const index = () => {
    return (    
       <Router>
           <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/register" exact component={Register} />
               <Route path="/Login" exact component={Login} />
               <Redirect to = "/" />
           </Switch>
       </Router>
    );
};

export default index;