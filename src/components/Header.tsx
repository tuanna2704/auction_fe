import React from 'react';
import { Layout, Menu, Dropdown, Button, Badge } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch } from "react-redux";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser, resetUser } from 'store/user.reducer';
const { Header: AntdHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const userValue = useSelector(selectUser);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token')

  const logout = () => {
    localStorage.removeItem('access_token');
    dispatch(resetUser());
    return navigate('/login');
  }

  const items: MenuProps['items'] = [
    {
      label: userValue.name,
      key: '0',
    },
    { type: 'divider' },
    {
      label: (
        <Button type="link" onClick={logout}> <LogoutOutlined /> Logout</Button>
      ),
      key: '1',
    },
  ];

  return (
    <AntdHeader>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: "60%" }}>
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
            <div style={{ width: "40%" }}>
              <Menu mode="horizontal" theme="dark">
                <Menu.Item key="1">
                  Lock: <Badge count={userValue.totalDepositLock} color='red' overflowCount={9999} />
                </Menu.Item>
                <Menu.Item key="2">
                  Deposit: <Badge count={userValue.deposit} color='gold' overflowCount={9999} />
                </Menu.Item>
                <Menu.Item key="3">
                  Available: <Badge count={userValue.deposit - userValue.totalDepositLock} color='green' overflowCount={9999} />
                </Menu.Item>
                <Menu.Item key="4">
                  <Dropdown menu={{ items }}>
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
