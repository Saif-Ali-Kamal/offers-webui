import React from 'react';
import { Menu, Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import history from '../../../../utils/history';
import OffersIcon from '../../../../icons/OffersIcon';
import CategoriesIcon from '../../../../icons/CategoriesIcon';
import './sidenav.css';
import StoresIcon from '../../../../icons/StoresIcon';
import AboutIcon from '../../../../icons/AboutIcon';
import ContactIcon from '../../../../icons/ContactIcon';

const { Sider } = Layout;

const Sidenav = ({ selectedNav, collapsed, mobileSidenav }) => {
  
  return (
    <Sider 
      style={mobileSidenav && { zIndex: 2, position:'absolute', top:64, bottom:0, left:0 }} 
      width={200} trigger={null} 
      collapsible collapsed={collapsed} 
      collapsedWidth={mobileSidenav ? 0 : 80}
      theme='light'>
      <Menu mode='vertical' defaultSelectedKeys={selectedNav} >
        <Menu.Item key='home' icon={ <HomeOutlined /> } 
          onClick={() => history.push('/')}> 
          Home
        </Menu.Item>
        <Menu.Item key='offers' icon={ <OffersIcon /> }
          onClick={() => history.push('/offers')}>
          Offers
        </Menu.Item>
        <Menu.Item key='categories' icon={ <CategoriesIcon /> }
          onClick={() => history.push('/categories')}>
          Categories
        </Menu.Item>
        <Menu.Item key='stores' icon={ <StoresIcon /> }
          onClick={() => history.push('/stores')}>
          Stores
        </Menu.Item>
        <Menu.Item key='about' icon={ <AboutIcon /> }
          onClick={() => history.push('/about')}>
          About
        </Menu.Item>
        <Menu.Item key='contact' icon={ <ContactIcon /> }
          onClick={() => history.push('/contact')}>
          Contact
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidenav;