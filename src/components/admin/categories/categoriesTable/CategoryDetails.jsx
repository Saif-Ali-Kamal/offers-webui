import React from "react";
import { Card, Image, Table, Typography } from "antd";

const CategoryDetails = ({ record }) => {

  const subcategoryTableColumn = [
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
          return <Image src={value} alt="img" height="64px" width="120px" />
        }
      }
    }
  ];

  return(
    <Card>
      <Typography.Title level={3}>Subcategories</Typography.Title>
      <Table 
        rowKey={record => record?._id}
        columns={subcategoryTableColumn} 
        dataSource={record} 
        bordered 
        scroll={{ x: 1000 }}
        pagination={false}
      />
    </Card>
  );
}

export default CategoryDetails;