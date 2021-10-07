import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import Sidenav from './sidenav/Sidenav';
import Topbar from './topbar/Topbar';
import { checkIfMobileScreen } from '../../../utils/utils';
import { Link } from 'react-router-dom';

const PageLayout = ({ children, selectedNav, crumbs = [], innerPage, title, route }) => {

  const [collapsed, setCollapsed] = useState(checkIfMobileScreen());
  const mobileSidenav = useSelector(state => state.utils.mobileSidenav);

  const closeSidenav = () => {
    if(mobileSidenav){
      if(checkIfMobileScreen()){
        setCollapsed(true);
      }else{
        setCollapsed(false);
      }
    }
  } 

  return (
    <Layout style={{ height:'100vh' }}>
      <Topbar toggle={() => {
        setCollapsed(!collapsed)} 
      }/>
      <Layout>
        <Sidenav selectedNav={selectedNav} collapsed={collapsed} closeSidenav={closeSidenav} mobileSidenav={mobileSidenav} />
        <Layout style={{ padding: innerPage ? '24px' : '0 24px', overflowY: 'scroll' }} onClick={closeSidenav}>
          {innerPage && <Layout 
            style={{ 
              position: 'fixed', 
              top: '64px', 
              left: mobileSidenav ? 0 : '200px', 
              zIndex: '2',
              width: '100%',
              background: '#FFFFFF',
              boxShadow:'0px 2px 4px rgba(0, 0, 0, 0.25)', 
              height: '32px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center', 
              padding: '8px 24px' }}>
            <Link to={route}>
              <ArrowLeftOutlined style={{ color: '#1DA57A' }} /> 
              <span style={{ color: '#1DA57A' }}> Go back</span>
            </Link>
            <h3 style={{ margin: '0 auto 0 30%' }}>{title}</h3>
          </Layout>}
          <Breadcrumb style={{ margin:'16px 0' }}>
            <Breadcrumb.Item href='/admin '>Admin</Breadcrumb.Item>
            {crumbs.map(crumb => 
              <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>)}
          </Breadcrumb>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
