import React, { useState } from 'react';
import { Form, Input, Upload, Card, Button, Typography } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { UploadOutlined } from '@ant-design/icons';
import ImageModal from '../../../common/ImageModal';

const AddEditStoreForm = ({ handleAddStore, handleCancelStore, initialvalues, handleEditStore, formType }) => {

  const [form] = Form.useForm();
  const { Dragger } = Upload;

  const [storeLogo, setStoreLogo] = useState(initialvalues?.logo);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const imageToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result.toString();
      setStoreLogo(result);
    }
    return false;
  }

  const onPreview = (file) => {
    setPreviewImage(file);
    setImageModalVisible(true);
  };

  const onRemove = () => {
    return new Promise((resolve, reject) => {
      confirm({
          title: 'Are you sure to remove this file?',
          onOk: () => {
            setStoreLogo(null);
            resolve(true);
          },
          onCancel: () => {
            reject(false);
          }
      })
    })
  }

  const formIntialValues = {
    name: initialvalues?.name,
    description: initialvalues?.description,
    networkName: initialvalues?.networkName,
    logo: initialvalues?.logo,
  }

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(formType === 'add'){
        const store = {
          name: values?.name,
          description: values?.description,
          networkName: values?.networkName,
          logo: storeLogo
        }
        handleAddStore(store);
      } else {
        let updatedStore = [];
        if(formIntialValues?.name !== values?.name) {
          updatedStore = [...updatedStore, { propName: 'name', value: `${values.name}` }];
        } if(formIntialValues?.description !== values?.description) {
          updatedStore = [...updatedStore, { propName: 'description', value: `${values.description}` }];
        } if(formIntialValues?.networkName !== values?.networkName) {
          updatedStore = [...updatedStore, { propName: 'networkName', value: `${values.networkName}` }];
        } if(values?.logo?.file && (formIntialValues?.logo !== storeLogo)) {
          updatedStore = [...updatedStore, { propName: 'logo', value: storeLogo }];
        }
        handleEditStore(initialvalues._id, updatedStore);
      }
      handleCancelStore();
    }) 
  }

  return(
    <Card bordered>
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' colon  onFinish={handleSubmit}>
        <Typography.Title level={4}>Store:</Typography.Title>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input the store name!' }]}>
          <Input placeholder='Store name'/>
        </Form.Item>
        <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the store description!' }]}>
          <Input.TextArea rows={4} placeholder='Store description' />
        </Form.Item>
        <Form.Item name='networkName' label='Network' rules={[{ required: true, message: 'Please input the store network name!' }]}>
          <Input placeholder='Store network name' />
        </Form.Item>
        <Form.Item name='logo' label='Logo'>
          <Dragger 
            name='file'
            accept='.png, .jpg, .jpeg, .svg'
            multiple={false}
            maxCount={1}
            listType='picture-card'
            onPreview={() => onPreview(storeLogo)}
            onRemove={onRemove}
            beforeUpload={imageToBase64}
            defaultFileList={initialvalues?.logo ? [{ thumbUrl: storeLogo }] : storeLogo}
          >
            <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>You can upload only one logo</p>
          </Dragger>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelStore}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>{formType === 'add' ? 'Add store' : 'Save store'}</Button>
      </div>
      {imageModalVisible && <ImageModal
        visible={imageModalVisible}
        title={'Preview Image'} 
        image={previewImage} 
        handleClose={() => {
          setPreviewImage(null);
          setImageModalVisible(false);
        }}
      />}
    </Card>
  );
} 

export default AddEditStoreForm;