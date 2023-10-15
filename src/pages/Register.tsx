import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'utils/api';
import { IRegisterUser } from 'utils/interface';

const Register = () => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: IRegisterUser) => {
    const response = await registerUser(values);
    
    if (response?.success) {
      const confirmed = await modal.success({
        title: 'Create Account Successful',
        content: <>You Can Login Now!</>
      });
      if(confirmed) {
        return navigate('/login');
      }
    } else {
      await modal.error({
        title: 'Create Account Failure',
        content: <>{response?.message}</>
      });
    }
  };

  return (
    <div style={{textAlign: "center", width: "300px", margin: "50px auto"}}>
      <h2>Register New User</h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
            {
              required: true,
              message: 'Email is required!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Name is required!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default Register;
