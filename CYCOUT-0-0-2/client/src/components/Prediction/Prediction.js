import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  SearchOutlined,
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Prediction.css";
import PredictionBox from "../Prediction/PredictionBox";
import RaceOverview from "./RaceOverview";

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
  getItem(<Link to="/dashboard" className='nav-links'>Dashboard</Link>, "dashboard", <PieChartOutlined />),
  getItem(<Link to="/profile" className='nav-links'>My Profile</Link>, "profile", <DesktopOutlined />),
  getItem(<Link to="/mybike" className='nav-links'>My Bikes</Link>, "bikes", <PieChartOutlined />),
  getItem(<Link to="/table" className='nav-links'>My Courses</Link>, "courses", <SearchOutlined />),
  getItem(<Link to="/mapbox" className='nav-links'>My Map</Link>, "maps", <AreaChartOutlined />),
  getItem(<Link to="/addrace" className='nav-links'>My Races</Link>, "races", <FileOutlined />),
  getItem(<Link to="/prediction" className='nav-links'>My Prediction</Link>, "prediction", <FileOutlined />)
];

function Prediction() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
          <div className="logo" style={{ color: "white", textAlign: "center" }}>
            <a href={window.location.origin + '/navbar'}>
            <img src={collapsed ? "CYCOUT-logo-bicycle.png" : "CYCOUT-logo-full.png"} style={{width: collapsed ? "50px" : "150px", margin:"10px"}} alt="CYCOUT-logo" />
            </a>
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
          >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style: {margin:"30px"},
            onClick: () => setCollapsed(!collapsed),

          })}

          <SettingOutlined style={{justifyContent: 'flex-end'}}/>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>
            <div class="row">
              <div className="prediction col-lg-9 col-md-8">
                <PredictionBox />
              </div>
              <div className="race_overview col-lg-3 col-md-4">
                <RaceOverview />
              </div>
            </div>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </div>
  );
}

export default Prediction;
