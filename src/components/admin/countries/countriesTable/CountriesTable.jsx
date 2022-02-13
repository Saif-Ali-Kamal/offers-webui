import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CountriesTable = ({ 
  countries, 
  reqFilters,
  setReqFilters, 
  handleAddCountryVisible, 
  handleEditCountryVisible, 
  handleDeleteCountry }) => {
  
  const handleUpateCountry = (id) => {
    handleEditCountryVisible(id);
  }

  const countryTableColumn = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      align: 'center'
    },{
      title: 'ISO code',
      key: 'isoCode',
      dataIndex: 'isoCode',
      align: 'center'
    },{
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
      align: 'center'
    },{
      title: 'Language',
      key: 'language',
      dataIndex: 'language',
      align: 'center',
      render: (value) => {
        if(value){
          return value.map((ln, index) => {
            if(index === value.length - 1){
              return <span>{ln.name}</span>
            } else {
              return <span>{ln.name}, </span>
            }
          })
        }
      }
    },{
      title: 'Flag',
      key: 'flag',
      dataIndex: 'flag',
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
            <Tooltip title='Edit country' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateCountry(record._id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this country?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteCountry(record._id)}>
              <Tooltip title='Delete country' color='#FF4D4F'>
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
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Countries
          <Button 
            type='primary' 
            onClick={handleAddCountryVisible}
            icon={<PlusOutlined/>}
          >
            Add country
          </Button>
        </h2>
        <Table 
          rowKey={record => record?._id}
          columns={countryTableColumn} 
          dataSource={countries} 
          bordered
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </Card>
    </React.Fragment>
  );
}

export default CountriesTable;