import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { signIn, getUserInfo } from 'utils/api';
import { IRegisterUser } from 'utils/interface';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/user.reducer';

const Login = () => {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: IRegisterUser) => {
    const response = await signIn(values);

    if (response?.success) {
      localStorage.setItem('access_token', response.access_token);
      const res = await getUserInfo();
      if (res.id) {
        dispatch(setUser(res));
      }
      return navigate('/');
    } else {
      await modal.error({
        content: <>{response?.message}</>
      });
    }
  };

  return (
    <div style={{ textAlign: "center", width: "300px", margin: "50px auto" }}>
      <h2>Login</h2>
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
            Login
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default Login;
