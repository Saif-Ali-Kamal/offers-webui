import React, { useState } from 'react';
import { Form, Input, Cascader, Select, DatePicker, Upload, Card, Button, Checkbox } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { UploadOutlined } from '@ant-design/icons';
import { categoryOptions } from '../../../../utils/constant';
import { useSelector } from 'react-redux';
import { displayingDateTime, formatParsingDateTime } from '../../../../utils/utils';
import moment from 'moment';
import ImageModal from '../../../common/ImageModal';

const AddEditOfferForm = ({ handleAddOffer, handleCancelOffer, initialvalues, handleEditOffer, formType }) => {

  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { Dragger } = Upload;

  const [productChecked, setProductChecked] = useState(initialvalues?.product ? true : false);
  const [offerType, setOfferType] = useState(initialvalues?.type);
  const [fileList, setFileList] = useState(initialvalues?.image || []);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const userId = useSelector(state => state.user.userData.userId);

  const imageToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result.toString();
      setFileList([...fileList, result]);
    }
    return false;
  }

  const onPreview = file => {
    setPreviewImage(file.thumbUrl);
    setImageModalVisible(true);
  };

  const onRemove = (file) => {
    return new Promise((resolve, reject) => {
      confirm({
          title: 'are you sure to remove this file?',
          onOk: () => {
            const filteredList = fileList.filter(image => image === file.thumbUrl);
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
    title: initialvalues?.title,
    description: initialvalues?.description,
    category: [initialvalues?.category, initialvalues?.subcategory],
    store: initialvalues?.store,
    product: initialvalues?.product,
    type: initialvalues?.type,
    mode: initialvalues?.mode,
    discount: initialvalues?.discount,
    code: initialvalues?.code,
    date: [displayingDateTime(initialvalues?.start), displayingDateTime(initialvalues?.end)],
    country: initialvalues?.country,
    tags: initialvalues?.tags,
    link: initialvalues?.link,
    image: initialvalues?.image
  }
  
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(formType === 'add'){
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
          start: formatParsingDateTime(values?.date[0]),
          end: formatParsingDateTime(values?.date[1]),
          country: values?.country,
          tags: values?.tags,
          link: values?.link,
          status: formatParsingDateTime(values?.date[0]) > formatParsingDateTime(new Date()) ? 'scheduled' : 
            formatParsingDateTime(values?.date[1]) < formatParsingDateTime(new Date()) ? 'expired' : 'active',
          image: values?.image?.fileList.map(file => file.thumbUrl)
        }
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
        } if(formIntialValues?.date[0] !== formatParsingDateTime(values?.date[0])) {
          updatedOffer = [...updatedOffer, { propName: 'start', value: `${formatParsingDateTime(values.date[0])}` }];
        } if(formIntialValues?.date[1] !== formatParsingDateTime(values?.date[1])) {
          updatedOffer = [...updatedOffer, { propName: 'end', value: `${formatParsingDateTime(values.date[1])}` }];
        } if(formIntialValues?.country !== values?.country) {
          updatedOffer = [...updatedOffer, { propName: 'country', value: values.country }];
        } if(formIntialValues?.tags !== values?.tags) {
          updatedOffer = [...updatedOffer, { propName: 'tags', value: values.tags }];
        } if(formIntialValues?.link !== values?.link) {
          updatedOffer = [...updatedOffer, { propName: 'link', value: `${values.link}` }];
        } if(values?.image?.file && (formIntialValues?.image[0] !== values?.image?.fileList[0]?.thumbUrl || formIntialValues?.image[1] !== values?.image?.fileList[1]?.thumbUrl)) {
          updatedOffer = [...updatedOffer, { propName: 'image', value: values?.image?.fileList?.map(file => file.thumbUrl) }];
        }
        updatedOffer = [...updatedOffer, { propsName: 'updatedAt', value: formatParsingDateTime(new Date()) }]
        handleEditOffer(initialvalues._id, updatedOffer);
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
          <Cascader options={categoryOptions} size='large' placeholder='Offer category' />
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
          <Select placeholder='Offer type' onChange={e => setOfferType(e)}>
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
            <Option value='store'>In Stores</Option>
          </Select>
        </Form.Item>
        <Form.Item name='discount' label='Discount' rules={[{ required: true, message: 'Please input the offer discount!' }]}>
          <Input placeholder='Offer discount'/>
        </Form.Item>
        {(offerType === 'coupon' || formIntialValues?.type === 'coupon') && <Form.Item name='code' label='Code' rules={[{ required: true, message: 'Please input the offer discount!' }]}>
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
            listType='picture-card'
            onPreview={onPreview}
            onRemove={onRemove}
            beforeUpload={imageToBase64}
            defaultFileList={initialvalues?.image ? fileList.map(fileUrl => {
              return { thumbUrl: fileUrl }
            }) : fileList}
          >
            <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>You can upload only two images</p>
          </Dragger>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelOffer}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>{formType === 'add' ? 'Add Offer' : 'Save Offer'}</Button>
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

export default AddEditOfferForm;