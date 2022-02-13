import React from 'react';
import { Menu, Layout } from 'antd';
import history from '../../../../utils/history';
import OffersIcon from '../../../../icons/OffersIcon';
import './sidenav.css';
import StoresIcon from '../../../../icons/StoresIcon';
import CategoriesIcon from '../../../../icons/CategoriesIcon';
import CountriesIcon from '../../../../icons/CountriesIcon';
import DashboardIcon from '../../../../icons/DashboardIcon';
import TagsIcon from '../../../../icons/TagsIcon';
import CarouselIcon from '../../../../icons/CarouselIcon';

const { Sider } = Layout;

const Sidenav = ({ selectedNav, collapsed, mobileSidenav }) => {
  
  return (
    <Sider 
      style={mobileSidenav && { zIndex: 2, position:'absolute', top:64, bottom:0, left:0 }} 
      width={200} 
      theme='light'
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      collapsedWidth={mobileSidenav ? 0 : 80}>
      <Menu theme='light' mode='inline' defaultSelectedKeys={selectedNav} >
        <Menu.Item key='dashboard' icon={ <DashboardIcon /> } 
          onClick={() => history.push('/admin/dashboard')}> 
          Dashboard
        </Menu.Item>
        <Menu.Item key='offers' icon={ <OffersIcon /> }
          onClick={() => history.push('/admin/offers')}>
          Offers
        </Menu.Item>
        <Menu.Item key='categories' icon={ <CategoriesIcon /> }
          onClick={() => history.push('/admin/categories')}>
          Categories
        </Menu.Item>
        <Menu.Item key='stores' icon={ <StoresIcon /> }
          onClick={() => history.push('/admin/stores')}>
          Stores
        </Menu.Item>
        <Menu.Item key='countries' icon={ <CountriesIcon /> }
          onClick={() => history.push('/admin/countries')}>
          Countries
        </Menu.Item>
        <Menu.Item key='tags' icon={ <TagsIcon /> }
          onClick={() => history.push('/admin/tags')}>
          Tags
        </Menu.Item>
        <Menu.Item key='carousels' icon={ <CarouselIcon /> }
          onClick={() => history.push('/admin/carousels')}>
          Carousels
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidenav;