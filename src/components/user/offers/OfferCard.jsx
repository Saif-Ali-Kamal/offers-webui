import React, { useState } from 'react';
import { Card, Col, Image, Row, Statistic, Tooltip, Typography } from 'antd';
import { UserOutlined, LikeOutlined } from '@ant-design/icons';
import SelectedOfferModal from './SelectedOfferModal';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../../utils/utils';

const OfferCard = ({ offer }) => {

  const [offerModalVisible, SetOfferModalVisible] = useState(false);

  const handleCardClick = () => {
    // window.open(offer.link, '_blank');
    // window.self.focus();
    SetOfferModalVisible(true);
  }

  return(
    <>
      <Card
        hoverable
        cover={offer.image ? 
          <Image 
            src={offer.image} 
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
        onClick={handleCardClick}
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <center>
          <Typography.Text 
            type='success' 
            strong
            style={{ 
              fontSize: '14px', 
              border: '1px dashed black', 
              padding: '8px',
              color: '#1DA57A'
            }}
          >
            {offer.discount}
          </Typography.Text>
        </center>
        <Row align='bottom'>
          <Col span={20} style={{ marginTop: '8px' }}>
            <Typography.Text 
              type='secondary'
              style={{ fontSize: '12px' }}
              italic
            >
              {capitalizeFirstLetter(offer.category)} / {capitalizeFirstLetter(offer.subcategory)}
            </Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text 
              type='secondary'
              style={{ fontSize: '12px' }}
              italic
            >
              {capitalizeFirstLetter(offer.mode)}
            </Typography.Text>
          </Col>
        </Row>
        <Typography.Title level={2} 
          strong 
          style={{ fontSize: '14px', margin: '8px 0' }}
        >
          {offer.title}
        </Typography.Title>
        <Row justify='space-between' align='middle'>
          <Col>
            <Tooltip title={`${offer.click} people used this`}>
              <Statistic 
                prefix={<UserOutlined />}
                valueStyle={{
                  fontSize: '12px'
                }}
              >
                {offer.click}
              </Statistic>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title={`${offer.like} people liked this`}>
              <Statistic 
                prefix={<LikeOutlined />}
                valueStyle={{
                  fontSize: '12px'
                }}
              >
                {offer.like}
              </Statistic>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip 
              title={`Expires In: ${moment(offer.end).format('DD/MM/YYYY')}`}
              color={'red'}
            >
              <Statistic.Countdown 
                value={offer.end} 
                format='DD[d] HH[h] mm[m] ss[s]'
                valueStyle={{
                  fontSize: '12px'
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Card>
      {offerModalVisible && 
        <SelectedOfferModal 
          visible={offerModalVisible}
          handleCancel={() => SetOfferModalVisible(false)}
          offer={offer}
        />
      }
    </>
  );
}

export default OfferCard;