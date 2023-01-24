import Logo from '../../Images/Logo.png'
import { Link } from 'react-router-dom';
import Group_member_photo from '../../Images/Group-photo.png'
import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined } from "@ant-design/icons";
  import { Breadcrumb, Layout, Menu, Divider } from "antd";
  import React from "react";
  import "./Aboutus.css";
  const { Header, Content, Sider } = Layout;
  
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem(<Link to="/" className='nav-links'>Return</Link>, "Return", <PieChartOutlined />),

  ];
  
  function Aboutus() {
    return (
      <div>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider>
              <div className="logo" style={{ color: "white", textAlign: "center" }}>
                <img src="CYCOUT-logo-full.png" style={{width:"150px", margin:"10px"}} alt="CYCOUT-logo" />
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
              </Breadcrumb>
              <div className="logo-block">
                <img src={Logo} alt="Logo" className="Logo-img"/>
              </div>
              <div className="about-us">
                <Divider >
                  Outdoor road Time Trial modeling tool 
                  <br />
                  Group CYCOUT 5
                </Divider>
                <big>
                  The main objective of this project is to develop a portable web-based application for outdoor road course prediction, 
                  <br/>
                  with the aim of planning the best training routines taking into account weather conditions, aerodynamics,
                  <br/> 
                  and athlete profiles. It can be freely adapted to the supply and demand model to better present the results to athletes, 
                  <br/>
                  coaches, etc. than traditional usage.
                </big>
                
              </div>
              <div className="group-infor">
                <div className="personal-infor">
                  <section>
                    <p> Group Member infor:</p>
                      <section>
                        <medium className="name-id">
                          a1808469 Mong Yuan Sim
                          <br />
                          a1788396 Peiyan Chen
                          <br />
                          a1810054 Ziqi Zhang
                          <br />
                          a1779748 Dong Wang
                          <br />
                          a1800430 Zhenhang Dong
                          <br />
                          a1790760 Wai Tong Suen
                          <br />
                          a1793295 Hyun Ji Moon
                          <br />
                          a1810064 Chi Wang
                          <br />
                          a1787526 Nhu Long Nguyen
                          <br />
                        </medium>
                      </section>
                  </section>
                </div>
                <div className="group-member-photo">
                  <img src={Group_member_photo} alt="Group_member_photo" className="Group-photo"/>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  
  }
  
  export default Aboutus;
  