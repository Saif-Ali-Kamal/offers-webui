import React from 'react';
import { Menu, Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import history from '../../../../utils/history';
import OffersIcon from '../../../../icons/OffersIcon';
import './sidenav.css';

const { Sider } = Layout;

const Sidenav = ({ selectedNav, collapsed, mobileSidenav }) => {
  
  return (
    <Sider 
      style={mobileSidenav && { zIndex: 2, position:'absolute', top:64, bottom:0, left:0 }} 
      width={200} 
      trigger={null} 
      collapsible 
      collapsed={collapsed} 
      theme='light'
      collapsedWidth={mobileSidenav ? 0 : 80}>
      <Menu theme='light' mode='inline' defaultSelectedKeys={selectedNav} >
        <Menu.Item key='dashboard' icon={ <HomeOutlined /> } 
          onClick={() => history.push('/admin/dashboard')}> 
          Dashboard
        </Menu.Item>
        <Menu.Item key='offers' icon={ <OffersIcon /> }
          onClick={() => history.push('/admin/offers')}>
          Offers
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidenav;