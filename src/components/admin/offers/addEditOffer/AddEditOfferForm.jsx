import React, { useState } from 'react';
import { Form, Input, Cascader, Select, DatePicker, Upload, Card, Button, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { categoryOptions } from '../../../../utils/constant';
import { useSelector } from 'react-redux';

const AddEditOfferForm = ({ handleAddOffer, handleCancelOffer, initialvalues, handleEditOffer }) => {

  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { Dragger } = Upload;

  const [productChecked, setProductChecked] = useState(false);
  const [type, setType] = useState('');

  const userId = useSelector(state => state.user.userData.userId);

  const formIntialValues = {
    title: initialvalues?.title,
    description: initialvalues?.description,
    category: [initialvalues?.category, initialvalues?.subcategory],
    store: initialvalues?.store,
    product: initialvalues?.product,
    type: initialvalues?.type,
    mode: initialvalues?.mode,
    discount: initialvalues?.discount,
    code: initialvalues?.code,
    date: [moment(initialvalues?.start), moment(initialvalues?.end)],
    country: initialvalues?.country,
    tags: initialvalues?.tags,
    link: initialvalues?.link,
    image: initialvalues?.image
  }

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(!initialvalues){
        const offer = {
          title: values?.title,
          description: values?.description,
          category: values?.category[0],
          subcategory: values?.category[1],
          store: values?.store,
          product: values?.product,
          type: values?.type,
          mode: values?.mode,
          discount: values?.discount,
          code: values?.code,
          creator: userId,
          createdAt: moment(new Date()),
          start: values?.date[0],
          end: values?.date[1],
          country: values?.country,
          tags: values?.tags,
          link: values?.link,
          click: 0,
          like: 0,
          image: values?.image.fileList.map(file => file.thumbUrl)
        }
        console.log(offer)
        handleAddOffer(offer);
      } else {
        let updatedOffer = [];
        if(formIntialValues?.title !== values?.title) {
          updatedOffer = [...updatedOffer, { propName: 'title', value: `${values.title}` }];
        } if(formIntialValues?.description !== values?.description) {
          updatedOffer = [...updatedOffer, { propName: 'description', value: `${values.description}` }];
        } if(formIntialValues?.category[0] !== values?.category[0] ) {
          updatedOffer = [...updatedOffer, { propName: 'category', value: `${values.category[0]}` }];
        } if(formIntialValues?.category[1] !== values?.category[1]) {
          updatedOffer = [...updatedOffer, { propName: 'subcategory', value: `${values.category[1]}` }];
        } if(formIntialValues?.store !== values?.store) {
          updatedOffer = [...updatedOffer, { propName: 'store', value: `${values.store}` }];
        } if(formIntialValues?.product !== values?.product) {
          updatedOffer = [...updatedOffer, { propName: 'product', value: `${values.product}` }];
        } if(formIntialValues?.type !== values?.type) {
          updatedOffer = [...updatedOffer, { propName: 'type', value: `${values.type}` }];
        } if(formIntialValues?.mode !== values?.mode) {
          updatedOffer = [...updatedOffer, { propName: 'mode', value: `${values.mode}` }];
        } if(formIntialValues?.discount !== values?.discount) {
          updatedOffer = [...updatedOffer, { propName: 'discount', value: `${values.discount}` }];
        } if(formIntialValues?.code !== values?.code) {
          updatedOffer = [...updatedOffer, { propName: 'code', value: `${values.code}` }];
        } if(formIntialValues?.date[0] !== values?.date[0]) {
          updatedOffer = [...updatedOffer, { propName: 'start', value: `${values.date[0]}` }];
        } if(formIntialValues?.date[1] !== values?.date[1]) {
          updatedOffer = [...updatedOffer, { propName: 'end', value: `${values.date[1]}` }];
        } if(formIntialValues?.county !== values?.county) {
          updatedOffer = [...updatedOffer, { propName: 'county', value: `${values.county}` }];
        } if(formIntialValues?.tags !== values?.tags) {
          updatedOffer = [...updatedOffer, { propName: 'tags', value: `${values.tags}` }];
        } if(formIntialValues?.link !== values?.link) {
          updatedOffer = [...updatedOffer, { propName: 'link', value: `${values.link}` }];
        } if(formIntialValues?.image !== values?.image) {
          updatedOffer = [...updatedOffer, { propName: 'image', value: `${values.image}` }];
        }
        handleEditOffer(initialvalues.id, updatedOffer);
      }
      handleCancelOffer();
    }) 
  }

  return(
    <Card bordered>
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' colon  onFinish={handleSubmit}>
        <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input the offer title!' }]}>
          <Input placeholder='Offer title'/>
        </Form.Item>
        <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the offer description!' }]}>
          <Input.TextArea rows={4} placeholder='Offer description' />
        </Form.Item>
        <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please select the offer category!' }]}>
          <Cascader options={categoryOptions} size='large' placeholder='Offer category' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='store' label='Store' rules={[{ required: true, message: 'Please select the offer store!' }]}>
          <Select placeholder='Offer store'>
            <Option value='amazon'>Amazon</Option>
            <Option value='flipkart'>Flipkart</Option>
            <Option value='myntra'>Myntra</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Checkbox checked={productChecked} onChange={(e) => setProductChecked(Boolean(e.target.checked))}>Is offer on a specific product?</Checkbox>
        </Form.Item>
        {productChecked && <Form.Item name='product' label='Product' rules={[{ required: true, message: 'Please input the full offer product name!' }]}>
          <Input placeholder='Offer product full name' />
        </Form.Item>}
        <Form.Item name='type' label='Type' rules={[{ required: true, message: 'Please select the type of offer!' }]}>
          <Select placeholder='Offer type' onChange={(e) => setType(e)}>
            <Option value='deal'>Deal</Option>
            <Option value='coupon'>Coupon</Option>
          </Select>
        </Form.Item>
        <Form.Item name='mode' label='Mode' rules={[{ required: true, message: 'Please select the mode of offer!' }]}>
          <Select placeholder='Offer mode'>
            <Option value='online'>Online</Option>
            <Option value='website'>Website only</Option>
            <Option value='app'>Mobile App Only</Option>
            <Option value='android'>Android App only</Option>
            <Option value='ios'>IOS App only</Option>
            <Option value='inStore'>In Stores</Option>
          </Select>
        </Form.Item>
        <Form.Item name='discount' label='Discount' rules={[{ required: true, message: 'Please input the offer discount!' }]}>
          <Input placeholder='Offer discount'/>
        </Form.Item>
        {type === 'coupon' && <Form.Item name='code' label='Code' rules={[{ required: true, message: 'Please input the offer discount!' }]}>
          <Input placeholder='Offer code'/>
        </Form.Item>}
        <Form.Item name='date' label='Date' rules={[{ required: true, message: 'Please select the offer Date!' }]}>
          <RangePicker style={{ width:'100%' }} showTime={{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}/>
        </Form.Item>
        <Form.Item name='country' label='Country' rules={[{ required: true, message: 'Please select the country of offer!' }]}>
          <Select mode='multiple' placeholder='Offer country'>
            <Option value='in'>India</Option>
            <Option value='us'>United states of america</Option>
          </Select>
        </Form.Item>
        <Form.Item name='tags' label='Tags' rules={[{ required: true, message: 'Please select the tags of offer!' }]}>
          <Select mode='tags' placeholder='Offer tags'>
            <Option value='in'>India</Option>
            <Option value='us'>United states of america</Option>
          </Select>
        </Form.Item>
        <Form.Item name='link' label='Link' rules={[{ required: true, message: 'Please input the offer link!' }]}>
          <Input placeholder='Offer link'/>
        </Form.Item>
        <Form.Item name='image' label='Image'>
          <Dragger 
            accept='.png, .jpg, .jpeg'
            multiple
            maxCount={2}
            listType='picture'
            beforeUpload={Upload.LIST_IGNORE}
          >
            <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>You can upload only two images</p>
          </Dragger>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelOffer}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>Add Offer</Button>
      </div>
    </Card>
  );
} 

export default AddEditOfferForm;