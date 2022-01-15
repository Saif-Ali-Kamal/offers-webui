import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryDetails from './CategoryDetails';

const CategoriesTable = ({ 
  categories, 
  reqFilters,
  setReqFilters, 
  handleAddCategoryVisible, 
  handleEditCategoryVisible, 
  handleDeleteCategory }) => {
  
  const handleUpateCategory = (id) => {
    handleEditCategoryVisible(id);
  }

  const categoryTableColumn = [
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
      title: 'Icon',
      key: 'icon',
      dataIndex: 'icon',
      align: 'center',
      render: (value) => {
        if(value){
          return <Image src={value} alt="img" />
        }
      }
    },{
      title: 'Action',
      render: (_, record) => {
        return(
          <React.Fragment>
            <Tooltip title='Edit Category' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateCategory(record._id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this category and subcategories inside it?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteCategory(record._id)}>
              <Tooltip title='Delete Category' color='#FF4D4F'>
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
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Categories
          <Button 
            type='primary' 
            onClick={handleAddCategoryVisible}
            icon={<PlusOutlined/>}
          >
            Add category
          </Button>
        </h2>
        <Table 
          rowKey={record => record?._id}
          columns={categoryTableColumn} 
          dataSource={categories} 
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
            expandedRowRender: record => <CategoryDetails record={record?.subcategories} />
          }}
        />
      </Card>
    </React.Fragment>
  );
}

export default CategoriesTable;