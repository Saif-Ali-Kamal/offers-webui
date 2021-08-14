import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Sidenav from './sidenav/Sidenav';
import Topbar from './topbar/Topbar';
import { checkIfMobileScreen } from '../../../utils';

const PageLayout = ({ children, selectedNav, crumbs = [] }) => {

  const [collapsed, setCollapsed] = useState(checkIfMobileScreen());

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
      }/>
      <Layout>
        <Sidenav selectedNav={selectedNav} collapsed={collapsed} closeSidenav={closeSidenav} />
        <Layout style={{ padding: '0 24px 24px' }} onClick={closeSidenav}>
          <Breadcrumb style={{ margin:'16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {crumbs.map(crumb => 
              <Breadcrumb.Item>{crumb}</Breadcrumb.Item>)}
          </Breadcrumb>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
