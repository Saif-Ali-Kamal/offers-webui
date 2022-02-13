import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TagTable = ({ 
  tags, 
  reqFilters,
  setReqFilters, 
  handleAddTagVisible, 
  handleEditTagVisible, 
  handleDeleteTag }) => {
  
  const handleUpateTag = (id) => {
    handleEditTagVisible(id);
  }

  const tagTableColumn = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      align: 'center'
    },{
      title: 'Action',
      render: (_, record) => {
        return(
          <React.Fragment>
            <Tooltip title='Edit tag' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateTag(record._id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this tag?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteTag(record._id)}>
              <Tooltip title='Delete tag' color='#FF4D4F'>
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
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Tags
          <Button 
            type='primary' 
            onClick={handleAddTagVisible}
            icon={<PlusOutlined/>}
          >
            Add tag
          </Button>
        </h2>
        <Table 
          rowKey={record => record?._id}
          columns={tagTableColumn} 
          dataSource={tags} 
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

export default TagTable;