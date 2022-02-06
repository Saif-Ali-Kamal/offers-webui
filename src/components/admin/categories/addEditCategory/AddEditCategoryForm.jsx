import React, { useState } from 'react';
import { Form, Input, Upload, Card, Button, Typography, Popconfirm } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { UploadOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ImageModal from '../../../common/ImageModal';

const AddEditCategoryForm = ({ handleAddCategory, handleCancelCategory, initialvalues, handleEditCategory, formType }) => {

  const [form] = Form.useForm();
  const { Dragger } = Upload;

  const [categoryIcon, setCategoryIcon] = useState(initialvalues?.icon);
  const [subcategoryIcon, setSubcategoryIcon] = useState(initialvalues?.subcategories ? initialvalues?.subcategories?.map(value => {
    if(value.icon){
      return value.icon;
    }
  }) : []);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const imageToBase64 = (file, type, index) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result.toString();
      if(type === 'category'){
        setCategoryIcon(result);
      } else {
        subcategoryIcon[index] = result;
      }
    }
    return false;
  }

  const onPreview = (file) => {
    setPreviewImage(file);
    setImageModalVisible(true);
  };

  const onRemove = (file, type) => {
    return new Promise((resolve, reject) => {
      confirm({
          title: 'Are you sure to remove this file?',
          onOk: () => {
            if(type === 'category'){
              setCategoryIcon(null);
            } else {
              const filteredList = subcategoryIcon.filter(image => image === file.thumbUrl);
              setSubcategoryIcon(filteredList);
            }
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
    icon: initialvalues?.icon,
    subcategories: initialvalues?.subcategories
  }
  console.log({subcategoryIcon, fi: formIntialValues.subcategories})
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(formType === 'add'){
        const category = {
          name: values?.name,
          description: values?.description,
          icon: categoryIcon,
          subcategories: values?.subcategories?.map((val, index) => {
            return { 
              name: val?.name,
              description: val?.description,
              icon: subcategoryIcon[index] 
            }
          })
        }
        handleAddCategory(category);
      } else {
        let updatedCategory = [];
        if(formIntialValues?.name !== values?.name) {
          updatedCategory = [...updatedCategory, { propName: 'name', value: `${values.name}` }];
        } if(formIntialValues?.description !== values?.description) {
          updatedCategory = [...updatedCategory, { propName: 'description', value: `${values.description}` }];
        } if(values?.icon?.file && (formIntialValues?.icon !== categoryIcon)) {
          updatedCategory = [...updatedCategory, { propName: 'icon', value: categoryIcon }];
        } if(formIntialValues?.subcategories !== values?.subcategories) {
          updatedCategory = [...updatedCategory, { propName: 'subcategories', value: values?.subcategories?.map((val, index) => {
            console.log(subcategoryIcon)
            return {
              name: val?.name,
              description: val?.description,
              icon: subcategoryIcon[index]
            }
          }) }];
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
            name='file'
            accept='.png, .jpg, .jpeg'
            multiple={false}
            maxCount={1}
            listType='picture-card'
            onPreview={() => onPreview(categoryIcon)}
            onRemove={(file) => onRemove(file, 'category')}
            beforeUpload={(file) => imageToBase64(file, 'category')}
            defaultFileList={initialvalues?.icon ? [{ thumbUrl: categoryIcon }] : categoryIcon}
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
            {fields.map(({ key, name, ...restField }, index) => (
              <Card bordered>
                <Form.Item {...restField} name={[name, "name"]} label='Name' rules={[{ required: true, message: 'Please input the subcategory name!' }]}>
                  <Input placeholder='Subcategory name'/>
                </Form.Item>
                <Form.Item {...restField} name={[name, "description"]} label='Description' rules={[{ required: true, message: 'Please input the subcategory description!' }]}>
                  <Input placeholder='Subcategory description'/>
                </Form.Item>   
                <Form.Item name={[name, "icon"]} label='Icon'>
                  <Dragger 
                    accept='.png, .jpg, .jpeg'
                    multiple={false}
                    maxCount={1}
                    listType='picture-card'
                    onPreview={() => onPreview(subcategoryIcon[index])}
                    onRemove={(file) => onRemove(file, 'subcategory')}
                    beforeUpload={(file) => imageToBase64(file, 'subcategory', index)}
                    defaultFileList={initialvalues?.subcategories ? [{ thumbUrl : subcategoryIcon[index] }] : subcategoryIcon}
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

export default AddEditCategoryForm;