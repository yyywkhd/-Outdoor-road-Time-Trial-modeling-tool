
import Logo from '../../Images/Logo.png'

import { Breadcrumb, Layout, Menu, Row, Col } from "antd";
import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined,  MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import React, {useState} from "react";
import "./Mybike.css";

import { Link } from 'react-router-dom';

// import Dashboard from "../Dashboard/Dashboard";
const { Header, Content, Sider} = Layout;

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

function Mybike() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" style={{ color: "white", textAlign: "center" }}>
            <a href={window.location.origin + '/'}>
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

              
            >
            </Breadcrumb>
            {/* <div className=""> */}
            <Row>
              <Col span={12}>
              <div className="add_bike_box">
                <medium className="Signup_title" style={{"color": "black"}}>Let's go to add a bike to your profile</medium>
                <br/>
                <small>You can click the button below to add the bike </small>
                {/* <div className="Login_box"> */}
                  <button className="Signup_btn" style={{"color":"white"}}>
                    <Link to="/Addbike">
                      + Add a bike
                    </Link>
                  </button>
                {/* </div> */}
              </div>
              </Col>
            </Row>



            {/* </div> */}
          </Content>  
        </Layout>
      </Layout>
    </div>
  );

}

export default Mybike;
