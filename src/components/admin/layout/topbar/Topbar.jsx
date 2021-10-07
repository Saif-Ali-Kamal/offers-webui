import React from 'react';
import { Avatar, Button, Divider, Layout, Popover, Row, Col } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userLogout } from '../../../../utils/utils';
import { adminRoles, superAdminRoles } from '../../../../utils/constant';

const { Header } = Layout

const Topbar = ({ toggle }) => {

  const admin = useSelector(state => state.user.userData);

  const profileContent = <div style={{ margin: '8px', width: '200px' }}>
    <Row>
      <Col span={5}>
        <Avatar style={{ background: '#1DA57A' }}>
          <UserOutlined />
        </Avatar>
      </Col>
      <Col span={18} offset={1}>
        <p style={{ marginBottom: '0' }}>
          {admin?.name} {admin?.roles?.toString() === superAdminRoles.toString() ? '(Super Admin)' : admin?.roles?.toString() === adminRoles.toString() ? '(Admin)' : ''}</p>
        <p style={{ margin: '0' }}>{admin?.email}</p>
      </Col>
    </Row>
    <Divider style={{ margin: '8px 0' }} />
    <center><Button type='primary' onClick={userLogout}>Sign out</Button></center>
  </div>
  

  return (
    <React.Fragment>
      <Header style={{ 
          background:'#fff', 
          zIndex:'3', 
          boxShadow:'0px 2px 4px rgba(0, 0, 0, 0.25)', 
          padding:'0 24px',
          position:'sticky',
          top:0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center' }}>
        {React.createElement(MenuOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
        <Popover content={profileContent} trigger='click'>
          <Avatar 
            style={{ background: '#1DA57A', cursor: 'pointer' }}
            >
            <UserOutlined/>
          </Avatar>
        </Popover>
      </Header>
    </React.Fragment>
  );
}

export default Topbar;