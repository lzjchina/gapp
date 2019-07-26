import React from 'react';
import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Home from './views/Home/Home';
import Content from './views/Content/Content';
import Login from './views/Login/Login';
import Error from './views/Error/Error';

const BasicRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/content" component={Content} />
      <Route exact path="/error" component={Error} />
      <Redirect from="/redirect" to="/home"/>
      <Route component={Error} />
    </Switch>
  </BrowserRouter>
);

export default BasicRoute;