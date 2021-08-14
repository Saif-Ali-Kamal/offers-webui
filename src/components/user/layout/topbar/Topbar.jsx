import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined, HomeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import OffersIcon from '../../../../icons/OffersIcon';
import CategoriesIcon from '../../../../icons/CategoriesIcon';
import StoresIcon from '../../../../icons/StoresIcon';
import AboutIcon from '../../../../icons/AboutIcon';
import ContactIcon from '../../../../icons/ContactIcon';

const { Header } = Layout

const Topbar = ({ toggle, selectedNav }) => {

  const mobileSidenav = useSelector(state => state.mobileSidenav)
  const history = useHistory();

  return (
    <React.Fragment>
      <Header style={{ 
          background:'#fff', 
          zIndex:'2', 
          boxShadow:'0px 2px 4px rgba(0, 0, 0, 0.25)', 
          padding:'0 24px',
          position:'sticky',
          top:0,
          display: 'flex',
          justifyContent: mobileSidenav ? '' : 'space-between',
          alignItems: 'center' }}>
          {mobileSidenav && React.createElement(MenuOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <h1>SAS</h1>
        {!mobileSidenav && <Menu mode='horizontal' defaultSelectedKeys={selectedNav}>
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
          <Menu.Item key='stores' icon={ <StoresIcon />  }
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
        </Menu>}
      </Header>
    </React.Fragment>
  );
}

export default Topbar;