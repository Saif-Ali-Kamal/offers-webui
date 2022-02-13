import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import history from './history';

import { AdminRoute } from './utils';
import Signin from '../pages/auth/signin/Signin';
import Signup from '../pages/auth/signup/Signup';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Offers from '../pages/admin/offers/Offers';

import Home from '../pages/user/Home';
import UserOffers from '../pages/user/UserOffers';
import AddEditOffer from '../pages/admin/offers/AddEditOffer';
import Categories from '../pages/admin/categories/Categories';
import AddEditCategory from '../pages/admin/categories/AddEditCategory';
import Stores from '../pages/admin/stores/Stores';
import AddEditStore from '../pages/admin/stores/AddEditStore';
import AddEditCountry from '../pages/admin/countries/AddEditCountry';
import Countries from '../pages/admin/countries/Countries';
import Tags from '../pages/admin/tags/Tags';
import AddEditTag from '../pages/admin/tags/AddEditTag';
import Carousels from '../pages/admin/carousel/Carousels';
import AddEditCarousel from '../pages/admin/carousel/AddEditCarousel';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/admin' exact component={() => <Redirect to={'/admin/signin'} /> } />
        <Route path='/admin/signin' exact component={Signin} />
        <Route path='/admin/signup' exact component={Signup} />

        <AdminRoute path='/admin/dashboard' exact component={Dashboard} />

        <AdminRoute path='/admin/offers' exact component={Offers} />
        <AdminRoute path='/admin/offers/addOffer' exact component={() => <AddEditOffer type='add' />} />
        <AdminRoute path='/admin/offers/editOffer' exact component={() => <AddEditOffer type='edit' />} />

        <AdminRoute path='/admin/categories' exact component={Categories} />
        <AdminRoute path='/admin/categories/addCategory' exact component={() => <AddEditCategory type='add' />} />
        <AdminRoute path='/admin/categories/editCategory' exact component={() => <AddEditCategory type='edit' />} />

        <AdminRoute path='/admin/stores' exact component={Stores} />
        <AdminRoute path='/admin/stores/addStore' exact component={() => <AddEditStore type='add' />} />
        <AdminRoute path='/admin/stores/editStore' exact component={() => <AddEditStore type='edit' />} />
        
        <AdminRoute path='/admin/countries' exact component={Countries} />
        <AdminRoute path='/admin/countries/addCountry' exact component={() => <AddEditCountry type='add' />} />
        <AdminRoute path='/admin/countries/editCountry' exact component={() => <AddEditCountry type='edit' />} />
        
        <AdminRoute path='/admin/tags' exact component={Tags} />
        <AdminRoute path='/admin/tags/addTag' exact component={() => <AddEditTag type='add' />} />
        <AdminRoute path='/admin/tags/editTag' exact component={() => <AddEditTag type='edit' />} />
        
        <AdminRoute path='/admin/carousels' exact component={Carousels} />
        <AdminRoute path='/admin/carousels/addCarousel' exact component={() => <AddEditCarousel type='add' />} />
        <AdminRoute path='/admin/carousels/editCarousel' exact component={() => <AddEditCarousel type='edit' />} />
        
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