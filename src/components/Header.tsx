import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token')

  const logout = () => {
    localStorage.removeItem('access_token');
    return navigate('/login');
  }

  const avatarMenu = (
    <Menu onClick={logout}>
      <Menu.Item key="logout">
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntdHeader>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: "70%" }}>
          <Menu theme="dark" mode="horizontal">
            {isLoggedIn && <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>}
            {isLoggedIn && <Menu.Item key="2"><Link to="/create-item">Create Item</Link></Menu.Item>}
            {isLoggedIn && <Menu.Item key="3"><Link to="/add-deposit">Deposit</Link></Menu.Item>}
            {!isLoggedIn && <Menu.Item key="4"><Link to="/register">Register</Link></Menu.Item>}
            {!isLoggedIn && <Menu.Item key="5"><Link to="/login">Login</Link></Menu.Item>}
          </Menu>
        </div>
        {isLoggedIn &&
          (
            <div>
              <Dropdown overlay={avatarMenu}>
                <Button shape="circle" icon={<UserOutlined />} />
              </Dropdown>
            </div>
          )
        }

      </div>
    </AntdHeader>
  )
}

export default Header;
