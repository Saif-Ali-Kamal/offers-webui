import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import history from './history';

import { AdminRoute } from './utils';
import Signin from '../pages/admin/signin/Signin';
import Signup from '../pages/admin/signup/Signup';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Offers from '../pages/admin/offers/Offers';

import Home from '../pages/user/Home';
import UserOffers from '../pages/user/UserOffers';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/admin' exact component={() => <Redirect to={'/admin/signin'} /> } />
        <Route path='/admin/signin' exact component={Signin} />
        <Route path='/admin/signup' exact component={Signup} />
        <AdminRoute path='/admin/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/offers' exact component={Offers} />
        <Route path='/' exact component={() => <Redirect to={'/home'} />} />
        <Route path='/home' exact component={Home} />
        <Route path='/offers' exact component={UserOffers} />
        <Route path='/categories' exact />
        <Route path='/stores' exact />
        <Route path='/about' exact />
        <Route path='/contact' exact />
      </Switch>
    </Router>
  );
}

export default Routes;