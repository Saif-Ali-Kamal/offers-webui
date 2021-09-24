import React, { useState } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux'
import Sidenav from './sidenav/Sidenav';
import Topbar from './topbar/Topbar';
import { checkIfMobileScreen } from '../../../utils/utils';

const PageLayout = ({ children, selectedNav }) => {

  const [collapsed, setCollapsed] = useState(checkIfMobileScreen());
  const mobileSidenav = useSelector(state => state.utils.mobileSidenav);

  const closeSidenav = () => {
    if(checkIfMobileScreen()){
      setCollapsed(true);
    }else{
      setCollapsed(false);
    }
  } 

  return (
    <Layout style={{ height:'100vh' }}>
      <Topbar toggle={() => {
        setCollapsed(!collapsed)} 
      } selectedNav={selectedNav} mobileSidenav={mobileSidenav} />
      <Layout>
        {mobileSidenav && <Sidenav selectedNav={selectedNav} collapsed={collapsed} closeSidenav={closeSidenav} mobileSidenav={mobileSidenav} />}
        <Layout style={{ padding: '24px' }} onClick={closeSidenav}>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
