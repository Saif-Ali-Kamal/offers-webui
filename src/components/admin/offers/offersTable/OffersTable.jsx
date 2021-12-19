import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, PauseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { formatDateTime, capitalizeFirstLetter } from '../../../../utils/utils';
import OfferDetails from './OfferDetails';
import { roles } from '../../../../utils/constant';

const OffersTable = ({ offers, user, handleAddOfferVisible, handleEditOfferVisible, handleDeleteOffer }) => {
  
  const handleUpateOffer = (id) => {
    handleEditOfferVisible(id);
  }

  const offerTableColumn = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title'
    },{
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      },
      filters: [
        { text: 'vehicle & accessories', value: 'vehicle' },
        { text: 'vehicle', value: 'vehicle' }
      ]
    },{
      title: 'Subcategory',
      key: 'subcategory',
      dataIndex: 'subcategory',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      },
      filters: [
        { text: 'vehicle & accessories', value: 'vehicle' },
        { text: 'vehicle', value: 'vehicle' }
      ]
    },{
      title: 'Store',
      key: 'store',
      dataIndex: 'store',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      },
      filters: [
        { text: 'Amazon', value: 'vehicle' },
        { text: 'vehicle', value: 'vehicle' }
      ]
    },{
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      },
      filters: [
        { text: 'Deal', value: 'deal' },
        { text: 'Coupon', value: 'coupon' }
      ]
    },{
      title: 'Mode',
      key: 'mode',
      dataIndex: 'mode',
      width: '0.1%',
      render: (value) => {
        if(value){
          return capitalizeFirstLetter(value);
        }
      },
      filters: [
        { text: 'Online', value: 'online' },
        { text: 'Website Only', value: 'website' },
        { text: 'Mobile App Only', value: 'app' },
        { text: 'Android Only', value: 'android' },
        { text: 'IOS Only', value: 'ios' },
        { text: 'In Stores', value: 'store' }
      ]
    },{
      title: 'Discount',
      key: 'discount',
      dataIndex: 'discount',
      width: '0.1%'
    },{
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
      width: '0.1%'
    },user.role === roles.superAdmin && {
      title: 'Creator',
      key: 'creator',
      dataIndex: 'creator',
      width: '0.1%'
    },{
      title: 'Starts',
      key: 'start',
      dataIndex: 'start',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDateTime(value);
        }
      }
    },{
      title: 'Ends',
      key: 'end',
      dataIndex: 'end',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDateTime(value);
        }
      }
    },{
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
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
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Paused', value: 'paused' },
        { text: 'Expired', value: 'expired' }
      ]
    },{
      title: 'Clicks',
      key: 'click',
      dataIndex: 'click',
      width: '0.1%'
    },{
      title: 'Likes',
      key: 'like',
      dataIndex: 'like',
      width: '0.1%'
    },{
      title: 'Action',
      render: (_, record) => {
        return(
          <React.Fragment>
            <Tooltip title='View offer' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost><EyeOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Tooltip title='Edit offer' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateOffer(record._id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this offer?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteOffer(record._id)}>
              <Tooltip title='Delete offer' color='#FF4D4F'>
                <Button style={{ color:'#FF4D4F', borderColor:'#FF4D4F' }}><DeleteOutlined style={{ fontSize:'16px' }}/></Button>
              </Tooltip>
            </Popconfirm>
          </React.Fragment>
        ); 
      }
    }
  ];

  return(
    <React.Fragment>
      <Card>
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Offers
          <Button 
            type='primary' 
            onClick={handleAddOfferVisible}
            icon={<PlusOutlined/>}
          >
            Add offer
          </Button>
        </h2>
        <Table 
          rowKey={record => record?._id}
          columns={offerTableColumn} 
          dataSource={offers} 
          bordered 
          pagination={true} 
          scroll={{ x: 1000 }}
          rowSelection={{
            
          }}
          expandable={{
            expandedRowRender: record => <OfferDetails record={record} />
          }}
        />
      </Card>
    </React.Fragment>
  );
}

export default OffersTable;