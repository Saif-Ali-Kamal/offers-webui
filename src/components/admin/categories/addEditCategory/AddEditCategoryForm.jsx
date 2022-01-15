import React, { useState } from 'react';
import { Form, Input, Upload, Card, Button, Typography, Popconfirm } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { UploadOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const AddEditCategoryForm = ({ handleAddCategory, handleCancelCategory, initialvalues, handleEditCategory, formType }) => {

  const [form] = Form.useForm();
  const { Dragger } = Upload;

  const [fileList, setFileList] = useState(initialvalues?.icon)
  const onPreview = async file => {
    let src = file.thumbUrl;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const icon = new Image();
    icon.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(icon.outerHTML);
  };

  const onRemove = (file) => {
    return new Promise((resolve, reject) => {
      confirm({
          title: 'are you sure to remove this file?',
          onOk: () => {
            const filteredList = fileList.filter(icon => icon === file.thumbUrl);
            setFileList(filteredList);
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
    icon: initialvalues?.icon
  }
  
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log(values)
      if(formType === 'add'){
        const category = {
          name: values?.name,
          description: values?.description,
          icon: values?.icon?.fileList[0]?.thumbUrl,
          subcategories: values?.subcategories
        }
        handleAddCategory(category);
      } else {
        let updatedCategory = [];
        if(formIntialValues?.name !== values?.name) {
          updatedCategory = [...updatedCategory, { propName: 'name', value: `${values.name}` }];
        } if(formIntialValues?.description !== values?.description) {
          updatedCategory = [...updatedCategory, { propName: 'description', value: `${values.description}` }];
        } if(values?.icon?.file && (formIntialValues?.icon !== values?.icon?.fileList[0]?.thumbUrl)) {
          updatedCategory = [...updatedCategory, { propName: 'icon', value: values?.icon?.fileList[0]?.thumbUrl }];
        }
        handleEditCategory(initialvalues._id, updatedCategory);
      }
      handleCancelCategory();
    }) 
  }

  return(
    <Card bordered>
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' colon  onFinish={handleSubmit}>
        <Typography.Title level={4}>Category:</Typography.Title>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input the category name!' }]}>
          <Input placeholder='Category name'/>
        </Form.Item>
        <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the category description!' }]}>
          <Input.TextArea rows={4} placeholder='Category description' />
        </Form.Item>
        <Form.Item name='icon' label='icon'>
          <Dragger 
            accept='.png, .jpg, .jpeg'
            multiple={false}
            maxCount={1}
            listType='picture-card'
            onPreview={onPreview}
            // onRemove={onRemove}
            beforeUpload={Upload.LIST_IGNORE}
            // onChange={file => setFileList(file.fileList)}
            // defaultFileList={initialvalues?.icon ? fileList.map(fileUrl => {
            //   return { thumbUrl: fileUrl }
            // }) : fileList}
          >
            <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>You can upload only one icon</p>
          </Dragger>
        </Form.Item>
        <Typography.Title level={4}>Subcategories:</Typography.Title>
        <Form.List name='subcategories'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card bordered>
                <Form.Item {...restField} name={[name, "name"]} label='Name' rules={[{ required: true, message: 'Please input the subcategory name!' }]}>
                  <Input placeholder='Subcategory name'/>
                </Form.Item>
                <Form.Item {...restField} name={[name, "description"]} label='Description' rules={[{ required: true, message: 'Please input the subcategory description!' }]}>
                  <Input placeholder='Subcategory name'/>
                </Form.Item>   
                <Form.Item name={[name, "icon"]} label='Icon'>
                  <Dragger 
                    accept='.png, .jpg, .jpeg'
                    multiple={false}
                    maxCount={1}
                    listType='picture-card'
                    // onPreview={onPreview}
                    // onRemove={onRemove}
                    beforeUpload={Upload.LIST_IGNORE}
                    // onChange={file => setFileList(file.fileList)}
                    // defaultFileList={initialvalues?.icon ? fileList.map(fileUrl => {
                    //   return { thumbUrl: fileUrl }
                    // }) : fileList}
                  >
                    <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
                    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                    <p className='ant-upload-hint'>You can upload only one icon</p>
                  </Dragger>
                </Form.Item>
                <Popconfirm title='Are you sure you want to delete this subcategory?' okText='Yes' cancelText='No' onConfirm={() => remove(name)}>
                  <Button
                    danger
                    block
                    icon={<MinusCircleOutlined />}
                  >
                    Delete subcategory
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
                    ...fields.map(obj => ["subcategories", obj.name,"name"]),
                    ...fields.map(obj => ["subcategories", obj.name,"description"])
                  ]
                  form.validateFields(fieldKeys)
                    .then(() => add())
                    .catch(ex => console.log("Exception", ex))
                }} 
                block 
                icon={<PlusCircleOutlined />}
              >
                Add subcategory
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelCategory}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>{formType === 'add' ? 'Add Category' : 'Save Category'}</Button>
      </div>
    </Card>
  );
} 

export default AddEditCategoryForm;