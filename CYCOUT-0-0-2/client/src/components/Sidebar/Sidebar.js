import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import "./Sidebar.css";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("My Profile", "profile", <DesktopOutlined />),
  getItem("My Bikes", "bikes", <PieChartOutlined />),
  getItem("My Courses", "courses", <SearchOutlined />),
  getItem("My Map", "maps", <AreaChartOutlined />),
  getItem("My Races", "races", <FileOutlined />),
];

function Sidebar() {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider>
          <div className="logo" style={{ color: "white", textAlign: "center" }}>
            <p>Logo here!!!</p>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >

              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            {/* <div
                    className="site-layout-background"
                    style={{
                    padding: 24,
                    minHeight: 360,
                    }}
                >
                    Content here.
                </div> */}
            {/* <Dashboard /> */}
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </div>
  );

}

export default Sidebar;
