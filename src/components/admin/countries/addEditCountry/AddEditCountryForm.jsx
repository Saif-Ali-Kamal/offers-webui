import React, { useState } from 'react';
import { Form, Input, Upload, Card, Button, Typography, Popconfirm } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { UploadOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ImageModal from '../../../common/ImageModal';

const AddEditCountryForm = ({ handleAddCountry, handleCancelCountry, initialvalues, handleEditCountry, formType }) => {

  const [form] = Form.useForm();
  const { Dragger } = Upload;

  const [countryFlag, setCountryFlag] = useState(initialvalues?.flag);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const imageToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result.toString();
      setCountryFlag(result);
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
            setCountryFlag(null);
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
    isoCode: initialvalues?.isoCode,
    code: initialvalues?.code,
    language: initialvalues?.language,
    flag: initialvalues?.flag,
  }

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(formType === 'add'){
        const country = {
          name: values?.name,
          isoCode: values?.isoCode,
          code: values?.code,
          language: values?.language,
          flag: countryFlag,
        }
        handleAddCountry(country);
      } else {
        let updatedCountry = [];
        if(formIntialValues?.name !== values?.name) {
          updatedCountry = [...updatedCountry, { propName: 'name', value: `${values.name}` }];
        } if(formIntialValues?.isoCode !== values?.isoCode) {
          updatedCountry = [...updatedCountry, { propName: 'isoCode', value: `${values.isoCode}` }];
        } if(formIntialValues?.code !== values?.code) {
          updatedCountry = [...updatedCountry, { propName: 'code', value: `${values.code}` }];
        } if(formIntialValues?.language !== values?.language) {
          updatedCountry = [...updatedCountry, { propName: 'language', value: values.language }];
        } if(values?.flag?.file && (formIntialValues?.flag !== countryFlag)) {
          updatedCountry = [...updatedCountry, { propName: 'flag', value: countryFlag }];
        } 
        handleEditCountry(initialvalues._id, updatedCountry);
      }
      handleCancelCountry();
    }) 
  }

  return(
    <Card bordered>
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' colon  onFinish={handleSubmit}>
        <Typography.Title level={4}>Country:</Typography.Title>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input the country name!' }]}>
          <Input placeholder='Country name'/>
        </Form.Item>
        <Form.Item name='isoCode' label='ISO code' rules={[{ required: true, message: 'Please input the country ISO code!' }]}>
          <Input placeholder='Country ISO code' />
        </Form.Item>
        <Form.Item name='code' label='Code' rules={[{ required: true, message: 'Please input the country code!' }]}>
          <Input placeholder='Country code' />
        </Form.Item>
        <Form.List name='language'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Card bordered>
                  <Form.Item {...restField} name={[name, "name"]} label='Language name' rules={[{ required: true, message: 'Please input the language name!' }]}>
                    <Input placeholder='Language name'/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "code"]} label='Language code' rules={[{ required: true, message: 'Please input the language code!' }]}>
                    <Input placeholder='Language code'/>
                  </Form.Item>   
                  <Popconfirm title='Are you sure you want to delete this subcountry?' okText='Yes' cancelText='No' onConfirm={() => remove(name)}>
                    <Button
                      danger
                      block
                      icon={<MinusCircleOutlined />}
                    >
                      Delete language
                    </Button>
                  </Popconfirm>                
                </Card>
              ))}
              <Form.Item>
                <Button 
                  type="primary"
                  ghost
                  onClick={() => {
                    const fieldKeys = [
                      ...fields.map(obj => ["language", obj.name,"name"]),
                      ...fields.map(obj => ["language", obj.name,"code"])
                    ]
                    form.validateFields(fieldKeys)
                      .then(() => add())
                      .catch(ex => console.log("Exception", ex))
                  }} 
                  block 
                  icon={<PlusCircleOutlined />}
                >
                  Add language
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name='flag' label='Flag'>
          <Dragger 
            name='file'
            accept='.png, .jpg, .jpeg, .svg'
            multiple={false}
            maxCount={1}
            listType='picture-card'
            onPreview={() => onPreview(countryFlag)}
            onRemove={onRemove}
            beforeUpload={imageToBase64}
            defaultFileList={initialvalues?.flag ? [{ thumbUrl: countryFlag }] : countryFlag}
          >
            <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>You can upload only one flag</p>
          </Dragger>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelCountry}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>{formType === 'add' ? 'Add country' : 'Save country'}</Button>
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

export default AddEditCountryForm;