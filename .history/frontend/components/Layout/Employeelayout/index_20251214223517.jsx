import React, { useState } from "react";
import {
  BranchesOutlined,
  DashOutlined,
  DollarCircleOutlined,
  GifOutlined,
  GiftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Links, useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const Employeelayout = ({ children }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const items = [
    {
      key: "/admin",
      icon: <DashOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/new-employee",
      icon: <UserOutlined />,
      label: <Link to="/admin/new-employee">New Employee</Link>,
    },
    {
      key: "/admin/branding",
      icon: <GiftOutlined />,
      label: <Link to="/admin/branding">Branding</Link>,
    },
    {
      key: "/admin/branch",
      icon: <BranchesOutlined />,
      label: <Link to="/admin/branch">Branch</Link>,
    },
    {
      key: "/admin/currency",
      icon: <DollarCircleOutlined />,
      label: <Link to="/admin/currency">Currency</Link>,
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
