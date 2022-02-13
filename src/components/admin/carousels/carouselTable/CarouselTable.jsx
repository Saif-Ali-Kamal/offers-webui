import React from 'react';
import { Card, Table, Button, Popconfirm, Tooltip, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDisplayingDateTime } from '../../../../utils/utils';

const CarouselTable = ({ 
  carousels,
  handleAddCarouselVisible, 
  handleEditCarouselVisible, 
  handleDeleteCarousel }) => {
  
  const handleUpateCarousel = (id) => {
    handleEditCarouselVisible(id);
  }

  const carouselTableColumn = [
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      align: 'center',
      render: (value) => {
        if(value){
          return <Image src={value} alt="img" height="64px" width="120px" />
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
      title: 'Action',
      render: (_, record) => {
        return(
          <React.Fragment>
            <Tooltip title='Edit carousel' color='#1DA57A'>
              <Button style={{ marginRight:'8px' }} type='primary' ghost onClick={() => handleUpateCarousel(record._id)}><EditOutlined style={{ fontSize:'16px' }}/></Button>
            </Tooltip>
            <Popconfirm title='Are you sure you want to delete this carousel?' okText='Yes' cancelText='No' onConfirm={() => handleDeleteCarousel(record._id)}>
              <Tooltip title='Delete carousel' color='#FF4D4F'>
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
        <h2 style={{ display:'flex', justifyContent:'space-between' }}>Carousels
          <Button 
            type='primary' 
            onClick={handleAddCarouselVisible}
            icon={<PlusOutlined/>}
          >
            Add carousel
          </Button>
        </h2>
        <Table 
          rowKey={record => record?._id}
          columns={carouselTableColumn} 
          dataSource={carousels} 
          bordered
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </Card>
    </React.Fragment>
  );
}

export default CarouselTable;