import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined  } from "@ant-design/icons";
  
  import {
    Form,
    Input,
    Button,
    Select,
  } from 'antd';
import $ from 'jquery'; //import jquery

import { Breadcrumb, Layout, Menu, Col, Divider, Row } from "antd";
import React, { useState } from "react";
  import { Link } from 'react-router-dom';
  import "./Addbike.css";
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
    getItem(<Link to="/dashboard" className='nav-links'>Dashboard</Link>, "dashboard", <PieChartOutlined />),
    getItem(<Link to="/profile" className='nav-links'>My Profile</Link>, "profile", <DesktopOutlined />),
    getItem(<Link to="/mybike" className='nav-links'>My Bikes</Link>, "bikes", <PieChartOutlined />),
    getItem(<Link to="/table" className='nav-links'>My Courses</Link>, "courses", <SearchOutlined />),
    getItem(<Link to="/mapbox" className='nav-links'>My Map</Link>, "maps", <AreaChartOutlined />),
    getItem(<Link to="/addrace" className='nav-links'>My Races</Link>, "races", <FileOutlined />),
  ];
  


  function Profile() {

    const [collapsed, setCollapsed] = useState(false);

      const submit = () => {

          alert("althlete_id=1&"+$("input").serialize()
              +"&bike_type="+ $("#bike_type").val()
              + "&bike_components="+ $("#bike_components").val()
              +"&front_wheel_type="+ $("#front_wheel_type").val()
              + "&front_wheel_width="+ $("#front_wheel_width").val()
              +"&rear_wheel_type="+ $("#rear_wheel_type").val()
              + "&rear_wheel_width="+ $("#rear_wheel_width").val()
              +"&tire_type="+ $("#tire_type").val()
              + "&tube_type="+ $("#tube_type").val()
              +"&racing_pos="+ $("#racing_pos").val()
              + "&climbing_pos="+ $("#climbing_pos").val()
              +"&helmet_type="+ $("#helmet_type").val() )

          $.ajax({

              url: '../bikeAdd',
              type: 'POST',
              data: "althlete_id=1&"+$("input").serialize()
                  +"&bike_type="+ $("#bike_type").val()
                  + "&bike_components="+ $("#bike_components").val()
                  +"&front_wheel_type="+ $("#front_wheel_type").val()
                  + "&front_wheel_width="+ $("#front_wheel_width").val()
                  +"&rear_wheel_type="+ $("#rear_wheel_type").val()
                  + "&rear_wheel_width="+ $("#rear_wheel_width").val()
                  +"&tire_type="+ $("#tire_type").val()
                  + "&tube_type="+ $("#tube_type").val()
                  +"&racing_pos="+ $("#racing_pos").val()
                  + "&climbing_pos="+ $("#climbing_pos").val()
                  +"&helmet_type="+ $("#helmet_type").val()
                  ,
              dataType: 'json',
              success: (result) =>{
                  console.log(result);
                  document.write(result);

              },

              error: (e) => {

                  console.log(e);
              }

          });
      };


    return (
      <div>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" style={{ color: "white", textAlign: "center" }}>
            <img src={collapsed ? "CYCOUT-logo-bicycle.png" : "CYCOUT-logo-full.png"} style={{width: collapsed ? "50px" : "150px", margin:"10px"}} alt="CYCOUT-logo" />
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
  
        <Form.Item wrapperCol={{
            offset: 4,
            span: 16,
          }}>
        </Form.Item>
        
        <Form
          labelCol={{
            span: 30,
          }}
  
          wrapperCol={{
            span: 30,
          }}
          
          layout="horizontal"

        >

        
        <Divider orientation="left">Bike Data</Divider>
        <div className="block_pos">
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={6}>
                    <Form.Item label="Bike Name">
                        <Input name = "bike_name" />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                    <Form.Item label="Bike Type">
                        <select id = "bike_type">
                        <option value="Road">Road</option>
                        <option value="Aero Road">Aero Road</option>
                        <option value="Tri/TT(entry level)">Tri/TT(entry level)</option>
                        <option value="Tri/TT">Tri/TTl</option>
                        <option value="Gravel">Gravel</option>
                        <option value="Mountain">Mountain</option>
                    </select>
                    </Form.Item>
                </Col>
            </Row>
        </div>

        <div className="block_pos">
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={6}>
                    <Form.Item label="Bike Weight(lbs)">
                        <Input name = "bike_weight" />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item label="Components">
                    <select id="bike_components">
                        <option value="High End">High End</option>
                        <option value="Mid Range">Mid Range</option>
                        <option value="Entry level)">Tri/TT(entry level)</option>
                    </select>
                    </Form.Item>
                </Col>
            </Row>
        </div>

        <Divider orientation="left">Wheel & Tire Data</Divider>
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
                <Form.Item label="Front Wheel Type">
                <select id = "front_wheel_type">
                    <option value="Standard Box Rim">Standard Box Rim</option>
                    <option value="Minimal Depth(30s)">Minimal Depth(30s)</option>
                    <option value="Medium Depth(60s)">Medium Depth(60s)</option>
                    <option value="Deep Depth(90s)">Deep Depth(90s)</option>
                    <option value="Tri-Spoke">Recreational</option>
                </select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
                <Form.Item label="Front Wheel Width">
                <select id = "front_wheel_width">
                    <option value="Width">Width</option>
                    <option value="Narrow">Narrow</option>
                    <option value="Wide">Wide</option>
                </select>
                </Form.Item>
            </Col>
        </Row>
        
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
                <Form.Item label="Rear Wheel Type">
                <select id = "rear_wheel_type" >
                    <option value="Standard Box Rim">Standard Box Rim</option>
                    <option value="Minimal Depth(30s)">Minimal Depth(30s)</option>
                    <option value="Medium Depth(60s)">Medium Depth(60s)</option>
                    <option value="Deep Depth(90s)">Deep Depth(90s)</option>
                    <option value="Tri-Spoke">Recreational</option>
                    <option value="Disc">Disc</option>
                </select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
                <Form.Item label="Rear Wheel Width">
                <select id = "rear_wheel_width">
                    <option value="Width">Width</option>
                    <option value="Narrow">Narrow</option>
                    <option value="Wide">Wide</option>
                </select>
                </Form.Item>                
            </Col>
        </Row>
          
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
                <Form.Item label="Tire Type">
                <select id = "tire_type">
                    <option value="Clincher(narrow 19-21)">Clincher(narrow 19-21)</option>
                    <option value="Clincher(medium 22-24)">Clincher(medium 22-24)</option>
                    <option value="Clincher(wide 25-28)">Clincher(wide 25-28)</option>
                    <option value="Tubular(narrow 19-21)">Tubular(narrow 19-21)</option>
                    <option value="Tubular(medium 22-24)">Tubular(medium 22-24)</option>
                    <option value="Tubular(wide 25-28)">Tubular(wide 25-28)</option>
                    <option value="Gravel Tires">Gravel Tires</option>
                    <option value="Mountain Bike Tires">Mountain Bike Tires</option>
                </select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
                <Form.Item label="Tube Type (clincher only)">
                <select id = "tube_type">
                    <option value="Butyl">Butyl</option>
                    <option value="Latem">Latem</option>
                    <option value="Tubeless">Tubeless</option>
                </select>
                </Form.Item>               
            </Col>
        </Row>
    </Form>
    <Form
          labelCol={{
            span: 3 ,
          }}
  
          wrapperCol={{
            span: 8,
          }}
          
          layout="horizontal"
          // onValuesChange={onFormLayoutChange}
          // disabled={componentDisabled}
        >
        <Divider orientation="left">Riding Style</Divider>
        <div className="block_pos">
            <Form.Item label="Racing Position">
                <select id = "racing_pos">
                <option value="Position">Position</option>
                <option value="Tops">Tops</option>
                <option value="Drops">Drops</option>
                <option value="Hoods">Hoods</option>
                <option value="Aerobars(Recreational Triathlete)">Aerobars(Recreational Triathlete)</option>
                <option value="Aerobars(Midpack Triathlete)">Aerobars(Midpack Triathlete)</option>
                <option value="Aerobars(Advanced Triathlete)">Aerobars(Advanced Triathlete)</option>
                <option value="Aerobars(Elite/Pro Time Trial)">Aerobars(Elite/Pro Time Trial)</option>
                <option value="Mountain Bike Bars">Mountain Bike Bars</option>
                </select>
            </Form.Item>
    
            <Form.Item label="Climbing Position">
                <select id = "climbing_pos">
                <option value="Position">Position</option>
                <option value="Upright">Upright</option>
                <option value="Tops">Tops</option>
                <option value="Hoods/Bullhorns">Hoods/Bullhorns</option>
                <option value="Mountain Bike Bars">Mountain Bike Bars</option>
                </select>
            </Form.Item>
    
            <Form.Item label="Helmet Type">
                <select id = "helmet_type">
                <option value="Road">Road</option>
                <option value="Aero">Aero</option>
                <option value="Mountain">Mountain</option>
                </select>
            </Form.Item>
        </div>
          
          <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
            <Button type="primary" htmlType="submit" onClick ={submit}>
              + Add My Bike
            </Button>
          </Form.Item>
        </Form>
        <br />
        <br />    
  
            {/* ========================================== */}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  
  }
  
  export default Profile;
  