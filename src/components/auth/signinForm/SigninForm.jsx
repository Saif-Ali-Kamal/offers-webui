import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SigninForm = ({ handleAdminSignin }) => {

  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values =>{
      handleAdminSignin(values.email, values.password);
    })
  }

  return (
    <React.Fragment>
      <Card bordered={true}>
        <center><UserOutlined style={{ color:'#1DA57A', fontSize:'500%' }}/>
        <h2 style={{ marginBottom:'24px' }}><b>Signin to your admin account</b></h2></center>
        <Form name='adminSignin' form={form} onFinish={handleSubmit}>
          <p><b>Email:</b></p>
          <Form.Item 
            name='email' 
            rules={[{ required: true, message:'Please enter your valid email!' }]}>
            <Input prefix={<MailOutlined style={{ color:'rgba(0, 0, 0, 0.25)' }} />} type='email' placeholder='Email' />
          </Form.Item>
          <p><b>Password:</b></p>
          <Form.Item 
            name='password'
            rules={[{ required: true, message:'Please enter your password!' }]}>
            <Input.Password prefix={<LockOutlined style={{ color:'rgba(0, 0, 0, 0.25)' }} />} placeholder='Password' />
          </Form.Item>
        </Form>
        <Button type='primary' style={{ width:'100%', marginBottom:'16px' }} onClick={handleSubmit}>Signin</Button>
        <center>Dont't have account?<Link to='/admin/signup'> <b>Signup</b></Link></center>
      </Card>
    </React.Fragment>
  );
} 

export default SigninForm;