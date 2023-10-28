import React from "react";
import { Layout, Menu, Dropdown, Button, Badge } from "antd";
import { googleLogout } from "@react-oauth/google";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, resetUser } from "store/user.reducer";
const { Header: AntdHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const userValue = useSelector(selectUser);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const logout = () => {
    localStorage.removeItem("access_token");
    dispatch(resetUser());
    googleLogout();
    return navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: userValue.name,
      key: "0",
    },
    { type: "divider" },
    {
      label: (
        <Button type="link" onClick={logout}>
          {" "}
          <LogoutOutlined /> Logout
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <AntdHeader>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "60%" }}>
          <Menu
            theme="dark"
            mode="horizontal"
            items={[
              { key: "1", label: <Link to="/">Dashboard</Link> },
              { key: "2", label: <Link to="/create-item">Create Item</Link> },
              { key: "3", label: <Link to="/add-deposit">Deposit</Link> },
              { key: "4", label: <Link to="/register">Register</Link> },
              { key: "5", label: <Link to="/login">Login</Link> },
            ]}
          />
        </div>
        {isLoggedIn && (
          <div style={{ width: "40%" }}>
            <Menu
              mode="horizontal"
              theme="dark"
              items={[
                {
                  key: "1",
                  label: (
                    <>
                      Lock:{" "}
                      <Badge
                        count={userValue.totalDepositLock}
                        color="red"
                        overflowCount={9999}
                      />
                    </>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <>
                      Deposit:{" "}
                      <Badge
                        count={userValue.deposit}
                        color="gold"
                        overflowCount={9999}
                      />
                    </>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <>
                      Available:{" "}
                      <Badge
                        count={userValue.deposit - userValue.totalDepositLock}
                        color="green"
                        overflowCount={9999}
                      />
                    </>
                  ),
                },
                {
                  key: "4",
                  label: (
                    <Dropdown menu={{ items }}>
                      <Button shape="circle" icon={<UserOutlined />} />
                    </Dropdown>
                  ),
                },
              ]}
            />
          </div>
        )}
      </div>
    </AntdHeader>
  );
};

export default Header;
