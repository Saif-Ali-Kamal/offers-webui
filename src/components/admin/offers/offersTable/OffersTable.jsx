import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDateTime, capitalizeFirstLetter } from '../../../../utils';

const OffersTable = ({ offers, handleAddOfferVisible, setOfferClicked, handleDeleteOffer }) => {
  
  const handleUpateOffer = (value) => {
    handleAddOfferVisible();
    setOfferClicked(value);
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
        return capitalizeFirstLetter(value);
      }
    },{
      title: 'Subcategory',
      key: 'subcategory',
      dataIndex: 'subcategory',
      width: '0.1%',
      render: (value) => {
        return capitalizeFirstLetter(value);
      }
    },{
      title: 'Store',
      key: 'store',
      dataIndex: 'store',
      width: '0.1%',
      render: (value) => {
        return capitalizeFirstLetter(value);
      }
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
    },{
      title: 'Starts',
      key: 'start',
      dataIndex: 'start',
      width: '0.1%',
      render: (value) => {
        return formatDateTime(value);
      }
    },{
      title: 'Ends',
      key: 'end',
      dataIndex: 'end',
      width: '0.1%',
      render: (value) => {
        return formatDateTime(value);
      }
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
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateOffer(record.id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this offer?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteOffer(record.id)}>
              <Tooltip title='Delete offer' color='#FF4D4F'>
                <Button style={{ color:'#FF4D4F', borderColor:'#FF4D4F' }}><DeleteOutlined style={{ fontSize:'16px' }}/></Button>
              </Tooltip>
            </Popconfirm>
          </React.Fragment>
        ); 
      }
    }
  ];

  const offerTableData = offers.map(offer => {
    return offer;
  })

  return(
    <React.Fragment>
      <Card>
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Offers table
          <Button type='primary' onClick={handleAddOfferVisible}><PlusOutlined/>Add offer</Button></h2>
        <Table columns={offerTableColumn} dataSource={offerTableData} bordered pagination={true} scroll={{ x: 1000 }}  />
      </Card>
    </React.Fragment>
  );
}

export default OffersTable;