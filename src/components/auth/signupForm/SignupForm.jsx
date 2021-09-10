import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SignupForm = ({ handleAdminSignup }) => {

  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      handleAdminSignup(values.name, values.email, values.password);
    })
  }

  return (
    <React.Fragment>
      <Card bordered={true}>
        <center><UserOutlined style={{ color:'#1DA57A', fontSize:'500%' }}/>
        <h2 style={{ marginBottom:'24px' }}><b>Create a admin account</b></h2></center>
        <Form name='adminSignup' form={form} onFinish={handleSubmit}>
          <p><b>Name:</b></p>
          <Form.Item 
            name='name' 
            rules={[{ required: true, message:'Please enter your name!' }]}>
            <Input prefix={<UserOutlined style={{ color:'rgba(0, 0, 0, 0.25)' }} />} placeholder='Name' />
          </Form.Item>
          <p><b>Email:</b></p>
          <Form.Item 
            name='email' 
            rules={[{ type: 'email', required: true, message: 'Please enter your valid email!' }]}>
            <Input prefix={<MailOutlined style={{ color:'rgba(0, 0, 0, 0.25)' }} />} type='email' placeholder='Email' />
          </Form.Item>
          <p><b>Password:</b></p>
          <Form.Item 
            name='password'
            rules={[{ required: true, message:'Please enter your password!' }]}>
            <Input.Password prefix={<LockOutlined style={{ color:'rgba(0, 0, 0, 0.25)' }} />} placeholder='Password' />
          </Form.Item>
        </Form>
        <Button type='primary' style={{ width:'100%', marginBottom:'16px' }} onClick={handleSubmit}>Signup</Button>
        <center>Already have account?<Link to='/admin/signin'> <b>Signin</b></Link></center>
      </Card>
    </React.Fragment>
  );
} 

export default SignupForm;