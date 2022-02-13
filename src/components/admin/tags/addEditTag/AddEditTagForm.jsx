import React from 'react';
import { Form, Input, Card, Button, Typography } from 'antd';

const AddEditTagForm = ({ handleAddTag, handleCancelTag, initialvalues, handleEditTag, formType }) => {

  const [form] = Form.useForm();

  const formIntialValues = {
    name: initialvalues?.name
  }

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(formType === 'add'){
        const tag = {
          name: values?.name
        }
        handleAddTag(tag);
      } else {
        let updatedTag = [];
        if(formIntialValues?.name !== values?.name) {
          updatedTag = [...updatedTag, { propName: 'name', value: `${values.name}` }];
        }
        handleEditTag(initialvalues._id, updatedTag);
      }
      handleCancelTag();
    }) 
  }

  return(
    <Card bordered>
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' colon  onFinish={handleSubmit}>
        <Typography.Title level={4}>Tag:</Typography.Title>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input the Tag name!' }]}>
          <Input placeholder='Tag name'/>
        </Form.Item>  
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelTag}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>{formType === 'add' ? 'Add tag' : 'Save tag'}</Button>
      </div>
    </Card>
  );
} 

export default AddEditTagForm;