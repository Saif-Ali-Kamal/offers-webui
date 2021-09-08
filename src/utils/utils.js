import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import { increment, decrement, set } from 'automate-redux';
import store from '../redux/store';

export const checkIfMobileScreen = () => {
  if(window.screen.width < 992){
    return true;
  }else{
    return false;
  }
}

export const incrementPendingRequests = () => {
  store.dispatch(increment("pendingRequests"))
}

export const decrementPendingRequests = () => {
  store.dispatch(decrement("pendingRequests"))
}

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: String(msg), duration: duration });
}

const decodeToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export const saveToken = (token) => {
  const decodedToken = decodeToken(token);
  if(token && (decodedToken.exp * 1000) > Date.now()){
    localStorage.setItem('token', token);
    localStorage.setItem('id', decodedToken.userid);
    localStorage.setItem('name', decodedToken.name);
    localStorage.setItem('email', decodedToken.email);
    localStorage.setItem('isAdmin', decodedToken.isAdmin);
    store.dispatch(set('user', { 
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      isAdmin: localStorage.getItem('isAdmin')
    }))
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
    const decodedToken = decodeToken(token);
    if(decodedToken.isAdmin && (decodedToken.exp * 1000) > Date.now())
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
  if(token) {
    const decodedToken = decodeToken(token);
    if(decodedToken.isAdmin && (decodedToken.exp * 1000) > Date.now() && isAdminLoggedin()) {
      saveToken(token);
      return <Redirect to='/admin/dashboard' />
    } else {
      localStorage.clear()
      return <Redirect to='/' />
    }
  }
}