import React, { useState } from 'react';
import { Form, Upload, Card, Button, Typography, DatePicker } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { UploadOutlined } from '@ant-design/icons';
import ImageModal from '../../../common/ImageModal';
import { displayingDateTime, formatParsingDateTime } from '../../../../utils/utils';
import moment from 'moment';

const AddEditCarouselForm = ({ handleAddCarousel, handleCancelCarousel, initialvalues, handleEditCarousel, formType }) => {

  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const { RangePicker } = DatePicker;

  const [carouselImage, setCarouselImage] = useState(initialvalues?.image);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const imageToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result.toString();
      setCarouselImage(result);
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
            setCarouselImage(null);
            resolve(true);
          },
          onCancel: () => {
            reject(false);
          }
      })
    })
  }

  const formIntialValues = {
    image: initialvalues?.image,
    date: [displayingDateTime(initialvalues?.start), displayingDateTime(initialvalues?.end)],
  }

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if(formType === 'add'){
        const carousel = {
          image: carouselImage,
          start: formatParsingDateTime(values?.date[0]),
          end: formatParsingDateTime(values?.date[1]),
        }
        handleAddCarousel(carousel);
      } else {
        let updatedCarousel = [];
        if(values?.image?.file && (formIntialValues?.image !== carouselImage)) {
          updatedCarousel = [...updatedCarousel, { propName: 'image', value: carouselImage }];
        } if(formIntialValues?.date[0] !== formatParsingDateTime(values?.date[0])) {
          updatedCarousel = [...updatedCarousel, { propName: 'start', value: `${formatParsingDateTime(values.date[0])}` }];
        } if(formIntialValues?.date[1] !== formatParsingDateTime(values?.date[1])) {
          updatedCarousel = [...updatedCarousel, { propName: 'end', value: `${formatParsingDateTime(values.date[1])}` }];
        } 
        handleEditCarousel(initialvalues._id, updatedCarousel);
      }
      handleCancelCarousel();
    }) 
  }

  return(
    <Card bordered>
      <Form form={form} initialValues={formIntialValues} hideRequiredMark={true} layout='vertical' colon  onFinish={handleSubmit}>
        <Typography.Title level={4}>Carousel:</Typography.Title>
        <Form.Item name='image' label='Image'>
          <Dragger 
            name='file'
            accept='.png, .jpg, .jpeg, .svg'
            multiple={false}
            maxCount={1}
            listType='picture-card'
            onPreview={() => onPreview(carouselImage)}
            onRemove={onRemove}
            beforeUpload={imageToBase64}
            defaultFileList={initialvalues?.image ? [{ thumbUrl: carouselImage }] : carouselImage}
          >
            <UploadOutlined style={{ fontSize: '50px', color: '#1DA57A' }} />
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>You can upload only one image</p>
          </Dragger>
        </Form.Item>
        <Form.Item name='date' label='Date' rules={[{ required: true, message: 'Please select the offer Date!' }]}>
          <RangePicker style={{ width:'100%' }} showTime={{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}/>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' ghost onClick={handleCancelCarousel}>Cancel</Button>
        <Button type='primary' onClick={handleSubmit}>{formType === 'add' ? 'Add carousel' : 'Save carousel'}</Button>
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

export default AddEditCarouselForm;