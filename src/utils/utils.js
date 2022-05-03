import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import jwt from 'jsonwebtoken';
import store from '../redux/store';
import { onPageLoad } from '../redux/reducers/userReducer';
import { toggleMobileSidenav } from '../redux/reducers/utilsReducer';
import { roles } from './constant';
import moment from 'moment';
import { refreshUserTokenAction } from '../redux/actions/userActions';

export const checkIfMobileScreen = () => {
  if(window.screen.width < 992){
    return true;
  }else{
    return false;
  }
}

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: String(msg), duration: duration });
}

export const saveToken = (token) => {
  const { userId, name, email, role, exp } = jwt.decode(token);
  if(token && (exp * 1000) > Date.now()){
    localStorage.setItem('token', token);
    localStorage.setItem('id', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    return { userId, name, email, role }
  }else{
    localStorage.clear();
  }
}

export const getToken = () => {
  if(localStorage.getItem('token')){
    return localStorage.getItem('token');
  }
}

export const userLogout = () => {
  localStorage.clear();
  window.location.reload();
}

export const formatParsingDateTime = (dateTime) => {
  return moment(dateTime).utc(true);
}

export const formatDisplayingDateTime = (dateTime) => {
  return moment(dateTime).utc(false).format("DD/MM/YYYY HH:mm:ss");
}

export const displayingDateTime = (dateTime) => {
  return moment(dateTime).utc(false);
}

export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const isAdminLoggedin = () => {
  const token = getToken();
  if(token){
    const { role } = jwt.decode(token);
    if(role === roles.admin){
      return true;
    }
  }else {
    return false;
  }
}

const isSuperAdminLoggedin = () => {
  const token = getToken();
  if(token){
    const { role } = jwt.decode(token);
    if(role === roles.superAdmin){
      return true;
    }
  }else {
    return false;
  }
}

export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      (isAdminLoggedin() || isSuperAdminLoggedin()) ? 
        <Component {...props} /> :
        <Redirect to='/admin/signin' /> 
    )} />
  );
};

export const onAppLoad = () => {
  const token = getToken();
  const mobileSidenav = checkIfMobileScreen();
  store.dispatch(toggleMobileSidenav(mobileSidenav));
  if(token) {
    if(isAdminLoggedin() || isSuperAdminLoggedin()) {
      const saveTokenData = saveToken(token);
      store.dispatch(onPageLoad(saveTokenData));
      return <Redirect to='/admin/dashboard' />
    } else {
      localStorage.clear();
      return <Redirect to='/' />
    }
  }
}