import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, PauseCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter, formatDisplayingDateTime } from '../../../../utils/utils';
import OfferDetails from './OfferDetails';
import { roles } from '../../../../utils/constant';

const OffersTable = ({ 
  offers, 
  user,
  reqFilters,
  setReqFilters, 
  handleAddOfferVisible, 
  handleEditOfferVisible, 
  handleDeleteOffer }) => {
  
  const handleUpateOffer = (id) => {
    handleEditOfferVisible(id);
  }

  const offerTableColumn = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
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
      },
      filters: [
        { text: 'vehicle & accessories', value: 'vehicle' },
        { text: 'vehicle', value: 'vehicle' }
      ]
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
      },
      filters: [
        { text: 'vehicle & accessories', value: 'vehicle' },
        { text: 'vehicle', value: 'vehicle' }
      ]
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
      },
      filters: [
        { text: 'Amazon', value: 'amazon' },
        { text: 'Filpkart', value: 'flipkart' }
      ]
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
      },
      filters: [
        { text: 'Deal', value: 'deal' },
        { text: 'Coupon', value: 'coupon' }
      ]
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
      title: 'Starts',
      key: 'start',
      dataIndex: 'start',
      align: 'center',
      width: '0.1%',
      render: (value) => {
        if(value){
          return formatDisplayingDateTime(value);
        }
      },
      sorter: true
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
      },
      sorter: true
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
          value === 'scheduled' ?
          <Tooltip title='Scheduled' color='#1890ff'>
            <ClockCircleOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
          </Tooltip> :
          <Tooltip title='Expired' color='#FF4D4F'> 
            <CloseCircleOutlined style={{ color: '#FF4D4F', fontSize: '24px' }} />
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
      align: 'center',
      width: '0.1%',
      sorter: true
    },{
      title: 'Likes',
      key: 'like',
      dataIndex: 'like',
      align: 'center',
      width: '0.1%',
      sorter: true
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
          columns={(user.role !== roles.superAdmin) ? offerTableColumn.filter(column => column.key !== 'creator' ) : offerTableColumn} 
          dataSource={offers} 
          bordered 
          onChange={(pagination, filters, sorter, extra) => {
            if(extra.action !== 'paginate'){
              setReqFilters({ ...reqFilters, ...filters, ...sorter })
            }
          }}
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 20,
            defaultCurrent: 1,
            pageSize: reqFilters.rowsPerPage,
            current: reqFilters.pageNo,
            pageSizeOptions: [20, 50, 80, 100],
            onChange: (page, pageSize) => {
              setReqFilters({ ...reqFilters, pageNo: page, rowsPerPage: pageSize })
            }
          }} 
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