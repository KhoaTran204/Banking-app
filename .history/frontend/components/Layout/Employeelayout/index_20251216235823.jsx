import React, { useState } from "react";
import {
  DashOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Links, useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const Employeelayout = ({ children }) => {
  const logoutFunc = () => {
    sessionStorage.removeItem("userInfo");
    cookies.remove("authToken");
    navigate("/");
  };
  const { pathname } = useLocation();
  console.log(pathname);
  const items = [
    {
      key: "/employee",
      icon: <DashOutlined />,
      label: <Link to="/employee">Dashboard</Link>,
    },
    {
      key: "/admin/logout",
      icon: <LogoutOutlined />,
      label: (
        <Button
          type="text"
          className="!text-gray-300 !font-semibold"
          onClick={logoutFunc}
        >
          Logout
        </Button>
      ),
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="!min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Employeelayout;
