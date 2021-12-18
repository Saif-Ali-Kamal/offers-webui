import React from "react";
import { Button, Col, Image, Modal, Row, Statistic, Tooltip, Typography } from "antd";
import { UserOutlined, LikeOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from "../../../utils/utils";
import moment from 'moment';

const SelectedOfferModal = ({ visible, handleCancel, offer }) => {
  return(
    <Modal
      centered
      width={720}
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      title={offer.image ? 
        <center><Image   
          src={offer.image[0]} 
          style={{ 
            width: '100%',
            height: '100%'
          }}
          preview={false}
        /> </center>: 
      ''}
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
        <Row 
          justify='space-between' 
          align='center'
          style={{ marginTop: '8px' }}
        >
          <Col>
            <Typography.Text type='secondary'>
              {capitalizeFirstLetter(offer.category)} / {capitalizeFirstLetter(offer.subcategory)}
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text type='secondary'>
              {capitalizeFirstLetter(offer.mode)}
            </Typography.Text>
          </Col>
        </Row>
        <Typography.Title level={4}>
          {offer.title}
        </Typography.Title>
        <Typography.Text>
            {offer.description}
        </Typography.Text>
        <center 
          style={{ margin: '8px 0' }}
        >
          {offer.type === 'coupon' ? <Typography.Text 
            style={{ 
              border: '2px dashed #1DA57A', 
              padding: '8px', 
              fontSize: '21px' 
            }}
            strong
            copyable
          >
            {offer.code}
          </Typography.Text> :
          <Button type='dashed'>Get The Deal</Button>}
        </center>
        <Row 
          justify='space-between' 
          align='middle'
        >
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
    </Modal>
  );
}

export default SelectedOfferModal;