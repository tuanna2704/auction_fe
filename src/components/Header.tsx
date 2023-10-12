import React from 'react';
import { Layout, Menu, Dropdown, Button, Badge } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'store/user.reducer';
const { Header: AntdHeader } = Layout;

const Header = () => {
  const userValue = useSelector(selectUser);
  console.log(userValue);
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
            <div >
              <Menu mode="horizontal" theme="dark">
                <Menu.Item key="1">
                  Lock Deposit: <Badge count={10} color='red' />
                </Menu.Item>
                <Menu.Item key="2">
                  Deposit: <Badge count={10} color='green' />
                </Menu.Item>
                <Menu.Item>
                  <Dropdown overlay={avatarMenu}>
                    <Button shape="circle" icon={<UserOutlined />} />
                  </Dropdown>
                </Menu.Item>
              </Menu>
            </div>
          )
        }

      </div>
    </AntdHeader>
  )
}

export default Header;
