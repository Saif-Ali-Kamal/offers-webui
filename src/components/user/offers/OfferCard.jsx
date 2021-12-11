import React from 'react';
import { Card, Col, Image, Row, Statistic, Typography } from 'antd';
import { UserOutlined, LikeOutlined } from '@ant-design/icons'

const OfferCard = ({ offer }) => {

  console.table(offer)
  return(
    <Card
      hoverable
      cover={offer.image ? 
        <Image 
          src={offer.image[0]} 
          style={{ objectFit: 'cover',
            objectPosition: '50% 50%', 
            borderTopLeftRadius: '10px', 
            borderTopRightRadius: '10px',
            height: '125px'
          }}
          preview={false}
        /> : 
      ''}
      size='small'
      type='inner'
      onClick={() => window.open(offer.link, '_blank')}
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <Row align='bottom'>
        <Col span={18}>
          <Typography.Text 
            type='secondary'
            style={{ fontSize: '12px' }}
            italic
          >
            {offer.category} / {offer.subcategory}
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text 
            type='success' 
            strong
            style={{ fontSize: '14px' }}
          >
            {offer.discount}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ margin: '8px 0' }}>
        <Col span={20}>
          <Typography.Text 
            strong 
            style={{ fontSize: '14px' }}
          >
            {offer.title}
          </Typography.Text>
        </Col>
      </Row>
      <Row justify='space-between' align='middle'>
        <Col>
          <Statistic 
            prefix={<UserOutlined />} 
            valueStyle={{
              fontSize: '12px'
            }}
          >
            {offer.click}
          </Statistic>
        </Col>
        <Col>
          <Statistic 
            prefix={<LikeOutlined />}
            valueStyle={{
              fontSize: '12px'
            }}
          >
            {offer.like}
          </Statistic>
        </Col>
        <Col>
          <Statistic.Countdown 
            value={offer.end} 
            format='DD HH mm ss'
            valueStyle={{
              fontSize: '12px'
            }} />
        </Col>
      </Row>
    </Card>
  );
}

export default OfferCard;