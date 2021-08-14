import React from 'react';
import Routes from './Routes';
import { checkIfMobileScreen } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'automate-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './App.less';

const App = () => {

  const dispatch = useDispatch(); 
  const pendingRequests = useSelector(state => state.pendingRequests);
  const loading = pendingRequests > 0 ? true : false; 
  
  checkIfMobileScreen() ? dispatch(set('mobileSidenav', true))
    : dispatch(set('mobileSidenav', false));
  
  return (
    <React.Fragment>
      <Routes />
       {loading && 
        <Spin className='page-loading' 
        indicator={<LoadingOutlined style={{ fontSize:'64px' }} spin/>} 
        spinning={true} 
        size='large' />}
    </React.Fragment>
  );
}

export default App;

