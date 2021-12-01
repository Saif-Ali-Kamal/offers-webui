import React from 'react';
import { Card, Col, Row } from 'antd';
import PageLayout from '../../../components/admin/layout/PageLayout';

const Dashboard = () => {
  return (
    <PageLayout selectedNav='dashboard' crumbs={[{ text: 'Dashboard' }]}>
      <Row gutter={[16, 24]}>
        <Col lg={{ span:8 }} xs={{ span: 24 }}>
          <Card>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <p>Active offers</p>
              <p style={{ color:'#73D13D' }}>+1.54%</p>
            </div>
            <center>
              
              <p style={{ fontSize:'24px'}}>100,000</p>
            </center>
          </Card>
        </Col>
        <Col lg={{ span:8 }} xs={{ span: 12 }}>
          <Card>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <p>Active offers</p>
              <p style={{ color:'#73D13D' }}>+1.54%</p>
            </div>
            <center>
              
              <p style={{ fontSize:'24px'}}>100,000</p>
            </center>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default Dashboard;