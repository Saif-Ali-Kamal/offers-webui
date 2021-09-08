import React from 'react';
import { Modal, Form, Input, Cascader, Select, DatePicker, Upload } from 'antd';
import moment from 'moment';
import { categoryOptions } from '../../../../utils/constant';

const AddOffer = ({ handleAddOffer, handleCancelOffer, initialvalues, handleEditOffer }) => {

  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  const formIntialValues = {
    title: initialvalues ? initialvalues.title : '',
    description: initialvalues ? initialvalues.description: '',
    category: initialvalues && initialvalues.category && initialvalues.subcategory ? [initialvalues.category, initialvalues.subcategory] : [],
    store: initialvalues ? initialvalues.store : undefined,
    discount: initialvalues ? initialvalues.discount : '',
    code: initialvalues ? initialvalues.code : '',
    date: initialvalues && initialvalues.start && initialvalues.end ? [moment(initialvalues.start), moment(initialvalues.end)] : [],
    link: initialvalues ? initialvalues.link : '',
    image: initialvalues ? initialvalues.image : ''
  }

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(!initialvalues){
        const offer = {
          title: values.title,
          description: values.description,
          category: values.category[0],
          subcategory: values.category[1],
          store: values.store,
          discount: values.discount,
          code: values.code,
          start: values.date[0],
          end: values.date[1],
          link: values.link,
          click: 0,
          like: 0,
          image: values.image
        }
        handleAddOffer(offer);
      } else {
        let updatedOffer = [];
        if(formIntialValues.title !== values.title) {
          updatedOffer = [...updatedOffer, { propName: 'title', value: `${values.title}` }];
        } if(formIntialValues.description !== values.description) {
          updatedOffer = [...updatedOffer, { propName: 'description', value: `${values.description}` }];
        } if(formIntialValues.category[0] !== values.category[0] ) {
          updatedOffer = [...updatedOffer, { propName: 'category', value: `${values.category[0]}` }];
        } if(formIntialValues.category[1] !== values.category[1]) {
          updatedOffer = [...updatedOffer, { propName: 'subcategory', value: `${values.category[1]}` }];
        } if(formIntialValues.store !== values.store) {
          updatedOffer = [...updatedOffer, { propName: 'store', value: `${values.store}` }];
        } if(formIntialValues.discount !== values.discount) {
          updatedOffer = [...updatedOffer, { propName: 'discount', value: `${values.discount}` }];
        } if(formIntialValues.code !== values.code) {
          updatedOffer = [...updatedOffer, { propName: 'code', value: `${values.code}` }];
        } if(formIntialValues.date[0] !== values.date[0]) {
          updatedOffer = [...updatedOffer, { propName: 'start', value: `${values.date[0]}` }];
        } if(formIntialValues.date[1] !== values.date[1]) {
          updatedOffer = [...updatedOffer, { propName: 'end', value: `${values.date[1]}` }];
        } if(formIntialValues.link !== values.link) {
          updatedOffer = [...updatedOffer, { propName: 'link', value: `${values.link}` }];
        } if(formIntialValues.image !== values.image) {
          updatedOffer = [...updatedOffer, { propName: 'image', value: `${values.image}` }];
        }

        handleEditOffer(initialvalues.id, updatedOffer);
      }
      handleCancelOffer();
    }) 
  }

  return(
    <Modal 
      title={initialvalues ? 'Edit offer' : 'Add offer'}
      visible={true}
      okText={initialvalues ? 'Save offer' : 'Add offer'}
      onOk={handleSubmit}
      onCancel={handleCancelOffer}
      width='600px'
      >
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' onFinish={handleSubmit}>
        <Form.Item name='title' label={<b>Title</b>} rules={[{ required: true, message: 'Please input the offer title!' }]}>
          <Input placeholder='Offer title'/>
        </Form.Item>
        <Form.Item name='description' label={<b>Description</b>} rules={[{ required: true, message: 'Please input the offer description!' }]}>
          <Input.TextArea rows={3} placeholder='Offer description' />
        </Form.Item>
        <Form.Item name='category' label={<b>Category</b>} rules={[{ required: true, message: 'Please select the offer category!' }]}>
          <Cascader options={categoryOptions} size='large' placeholder='Offer category' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='store' label={<b>Store</b>} rules={[{ required: true, message: 'Please select the offer store!' }]}>
          <Select placeholder='Offer store'>
            <Option value='amazon'>Amazon</Option>
            <Option value='flipkart'>Flipkart</Option>
            <Option value='myntra'>Myntra</Option>
          </Select>
        </Form.Item>
        <Form.Item name='discount' label={<b>Discount</b>} rules={[{ required: true, message: 'Please input the offer discount!' }]}>
          <Input placeholder='Offer discount'/>
        </Form.Item>
        <Form.Item name='code' label={<b>Code</b>}>
          <Input placeholder='Offer code'/>
        </Form.Item>
        <Form.Item name='date' label={<b>Date</b>} rules={[{ required: true, message: 'Please select the offer Date!' }]}>
          <RangePicker style={{ width:'100%' }} showTime={{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}/>
        </Form.Item>
        <Form.Item name='link' label={<b>Link</b>} rules={[{ required: true, message: 'Please input the offer link!' }]}>
          <Input placeholder='Offer link'/>
        </Form.Item>
        <Form.Item name='image' label={<b>Image</b>}>
          <Input placeholder='Offer image link'/>
        </Form.Item>
      </Form>
    </Modal>
  );
} 

export default AddOffer;