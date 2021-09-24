import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import jwt from 'jsonwebtoken';
import store from '../redux/store';
import { onPageLoad } from '../redux/reducers/userReducer';
import { toggleMobileSidenav } from '../redux/reducers/utilsReducer';

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
  const { userId, name, email, roles, exp } = jwt.decode(token);
  if(token && (exp * 1000) > Date.now()){
    localStorage.setItem('token', token);
    localStorage.setItem('id', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', roles);
    return { userId, name, email, roles }
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

export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime).getDate();
  const month = new Date(dateTime).getMonth();
  const year = new Date(dateTime).getFullYear();
  const hour = new Date(dateTime).getHours();
  const minute = new Date(dateTime).getMinutes();
  const second = new Date(dateTime).getSeconds();
  return `${date}/${month}/${year} ${hour}:${minute}:${second}`;
}

export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const isAdminLoggedin = () => {
  const token = getToken();
  if(token){
    const { roles, exp } = jwt.decode(token);
    if(roles && (exp * 1000) > Date.now())
      return true;
  }else {
    return false;
  }
}


export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAdminLoggedin() ? 
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
    const { roles, exp } = jwt.decode(token);
    if(roles && (exp * 1000) > Date.now() && isAdminLoggedin()) {
      const saveTokenData = saveToken(token);
      store.dispatch(onPageLoad(saveTokenData));
      return <Redirect to='/admin/dashboard' />
    } else {
      localStorage.clear()
      return <Redirect to='/' />
    }
  }
}