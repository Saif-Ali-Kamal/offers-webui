import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const StoreTable = ({ 
  stores, 
  reqFilters,
  setReqFilters, 
  handleAddStoreVisible, 
  handleEditStoreVisible, 
  handleDeleteStore }) => {
  
  const handleUpateStore = (id) => {
    handleEditStoreVisible(id);
  }

  const storeTableColumn = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      align: 'center'
    },{
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      align: 'center'
    },{
      title: 'Network',
      key: 'networkName',
      dataIndex: 'networkName',
      align: 'center'
    },{
      title: 'Logo',
      key: 'logo',
      dataIndex: 'logo',
      align: 'center',
      render: (value) => {
        if(value){
          return <Image src={value} alt="img" height="64px" width="120px" />
        }
      }
    },{
      title: 'Action',
      render: (_, record) => {
        return(
          <React.Fragment>
            <Tooltip title='Edit store' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateStore(record._id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this store?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteStore(record._id)}>
              <Tooltip title='Delete store' color='#FF4D4F'>
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
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Stores
          <Button 
            type='primary' 
            onClick={handleAddStoreVisible}
            icon={<PlusOutlined/>}
          >
            Add store
          </Button>
        </h2>
        <Table 
          rowKey={record => record?._id}
          columns={storeTableColumn} 
          dataSource={stores} 
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
        />
      </Card>
    </React.Fragment>
  );
}

export default StoreTable;