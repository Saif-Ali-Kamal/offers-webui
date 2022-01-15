import React from "react";
import { Card, Image, Table, Tooltip, Typography } from "antd";
import { PauseCircleOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter, formatDisplayingDateTime } from '../../../../utils/utils';

const OfferDetails = ({ record }) => {

  const offerRecordColumn = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
      align: 'center'
    },{
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      align: 'center'
    },{
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      align:'center',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      }
    },{
      title: 'Subcategory',
      key: 'subcategory',
      dataIndex: 'subcategory',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      }
    },{
      title: 'Store',
      key: 'store',
      dataIndex: 'store',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      }
    },{
      title: 'Product',
      key: 'product',
      dataIndex: 'product',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      }
    },{
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      }
    },{
      title: 'Mode',
      key: 'mode',
      dataIndex: 'mode',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      }
    },{
      title: 'Discount',
      key: 'discount',
      dataIndex: 'discount',
      align: 'center',
      width: '0.1%'
    },{
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
      align: 'center',
      width: '0.1%'
    },{
      title: 'Creator',
      key: 'creator',
      dataIndex: 'creator',
      align: 'center',
      width: '0.1%',
      filter: []
    },{
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDisplayingDateTime(value);
        }
      }
    },{
      title: 'Updated At',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDisplayingDateTime(value);
        }
      }
    },{
      title: 'Starts',
      key: 'start',
      dataIndex: 'start',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDisplayingDateTime(value);
        }
      }
    },{
      title: 'Ends',
      key: 'end',
      dataIndex: 'end',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDisplayingDateTime(value);
        }
      }
    },{
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
      align: 'center',
      width: '0.1%',
    },{
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      width: '0.1%',
    },{
      title: 'Link',
      key: 'link',
      dataIndex: 'link',
      align: 'center',
      width: '0.1%',
    },{
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        return value === 'active' ? 
          <Tooltip title='Active' color='#1DA57A'> 
            <CheckCircleOutlined style={{ color: '#1DA57A', fontSize: '24px' }} />
          </Tooltip> : 
          value === 'paused' ? 
          <Tooltip title='Paused' color='#808080'>
            <PauseCircleOutlined style={{ color: '#808080', fontSize: '24px' }} />
          </Tooltip> :
          <Tooltip title='Expired' color='#FF4D4F'> 
            <ClockCircleOutlined style={{ color: '#FF4D4F', fontSize: '24px' }} />
          </Tooltip> ;
      }
    },{
      title: 'Clicks',
      key: 'click',
      dataIndex: 'click',
      align: 'center',
      width: '0.1%'
    },{
      title: 'Likes',
      key: 'like',
      dataIndex: 'like',
      align: 'center',
      width: '0.1%'
    },{
      title: 'Images',
      key: 'image',
      dataIndex: 'image',
      align: 'center',
      render: (value) => {
        if(value[0]){
          return <Image src={value[0]} alt="img" />
        } if(value[1]){
          return <Image src={value[1]} alt="img" />
        }
      }
    }
  ];

  return(
    <Card bordered>
      <Typography.Title level={4}>Offer Details</Typography.Title> 
      <Table 
        rowKey={record => record?._id}
        columns={offerRecordColumn} 
        dataSource={[record]} 
        bordered 
        scroll={{ x: 1000 }}
        pagination={false}
      />
    </Card>
  );
}

export default OfferDetails;