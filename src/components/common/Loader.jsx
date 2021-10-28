import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return(
    <Spin 
      className='page-loading' 
      indicator={<LoadingOutlined style={{ fontSize:'64px' }} spin/>} 
      spinning={true} 
      size='large' 
    />
  );
}

export default Loader;