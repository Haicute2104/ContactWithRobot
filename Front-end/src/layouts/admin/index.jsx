import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { AiFillProduct } from "react-icons/ai";
import { AiFillFileText } from "react-icons/ai";

const { Header, Sider, Content } = Layout;

function LayoutDefaultAdmin({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <h3 style={{ color:"pink", textAlign:"center" }}>QBBy</h3>
        {/* <div style={{ height: 64, background: '#001529', marginBottom: 16 }} /> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to="dashboard">Tổng quan</Link>,
            },
            {
              key: '2',
              icon: <AiFillProduct />,
              label: <Link to="product">Quản lý sản phẩm</Link>,
            },
            {
              key: '3',
              icon: <AiFillFileText  />,
              label: <Link to="blog">Quản lý bài viết</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutDefaultAdmin;
