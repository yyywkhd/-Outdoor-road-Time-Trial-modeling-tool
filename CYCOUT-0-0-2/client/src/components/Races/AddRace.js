
import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, UploadOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined  } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
  Upload,
  Typography,
  Switch,
  Slider
} from 'antd';

import { Breadcrumb, Layout, Menu, message } from "antd";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./AddRace.css";

const { Title } = Typography;
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

// this method is for advanced settings
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function AddRace() {
  //this method is for slider
  //const [inputValue, setInputValue] = useState(1);
  //!!!!Here got a warning
  const [inputValue]= useState(1);
  const [collapsed, setCollapsed] = useState(false);
  /*
    const sliderOnChange = (newValue) => {
    setInputValue(newValue);
  };
  */
  
  // const FormDisabledDemo = () => {
    // const [componentDisabled, setComponentDisabled] = useState(true);
  
    // const onFormLayoutChange = ({ disabled }) => {
    //   setComponentDisabled(disabled);
    // };
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
            defaultSelectedKeys={["2"]}
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

       {/* ====================FORM STARTS HERE==================== */}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >

      {/* ====================MY RACE PROFILE==================== */}

        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>My Race Profile</Title>
        </Form.Item>


        <Form.Item label="Race Name">
          <Input />
        </Form.Item>

        <Form.Item label="Race Type">
          <Select>
            <Select.Option value="Triathlon">Pro/Elite</Select.Option>
            <Select.Option value="Time Trial">Time Trial</Select.Option>
            <Select.Option value="Road Race">Road Race</Select.Option>
            <Select.Option value="Mountain Bike">Mountain Bike</Select.Option>
          </Select>
        </Form.Item>

        {/* select bike from bikes that users have added */}
        <Form.Item label="My Bike">
          <Select>
            <Select.Option value="test">bike1</Select.Option>
          </Select>
        </Form.Item>


        {/* ====================SELECT A COURSE==================== */}

        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>Select A Course</Title>
        </Form.Item>

        {/* select course from courses added by users */}
        <Form.Item label="My Courses">
          <Select>
            <Select.Option value="course1">Course 1</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Course Road Condition">
          <Select>
            <Select.Option value="perfect">Perfect (track surface)</Select.Option>
            <Select.Option value="good">Good (smooth asphalt)</Select.Option>
            <Select.Option value="average">Average (typical road mix)</Select.Option>
            <Select.Option value="poor">Poor (cracked/worn roads)</Select.Option>
            <Select.Option value="rough">Rouge(fresh chip seal)</Select.Option>
            <Select.Option value="offroad1">Off Road (gravel)</Select.Option>
            <Select.Option value="offroad2">Off Road (dirt)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Course Terrain">
          <Select>
            <Select.Option value="opencoast">Open Coast</Select.Option>
            <Select.Option value="desertplains">Desert/Plains</Select.Option>
            <Select.Option value="mixedpopulated">Mixed/Populated</Select.Option>
            <Select.Option value="heavyforest">Heavy Forest</Select.Option>
            <Select.Option value="mountainous">Mountainous</Select.Option>
            <Select.Option value="innercity">Inner City</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Course Distance">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Average Altitude">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Course Map">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>


        {/* ====================SET WEATHER CONDITION==================== */}

        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>Set Weather Conditions</Title>
        </Form.Item>

        {/* need to think about how bestbike split advanced weather works */}
        <Form.Item label="Choose type">
          <Radio>Standard Weather</Radio>
          <Radio>Advanced Weather</Radio>
        </Form.Item>


        {/* ====================SET STANDARD WEATHER==================== */}

        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>Set Standard Weather</Title>
        </Form.Item>

        <Form.Item label="Temperature">
          <InputNumber /> ℉ 
        </Form.Item>

        <Form.Item label="Relative Humidity">
          <InputNumber /> % 
        </Form.Item>

        <Form.Item label="Wind Speed">
          <InputNumber /> mph
        </Form.Item>

        <Form.Item label="Wind Direction">
          <InputNumber /> degrees
        </Form.Item>


        {/* ====================SET MODEL TYPE==================== */}


        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>Set Model Type</Title>
        </Form.Item>

        <Form.Item label="Choose type">
          <Radio>Normalized Power Model (NP)</Radio>
          <Radio>Goal Time Model (GT)</Radio>
          <Radio>Training Stress Score Model (TSS)</Radio>
        </Form.Item>


        {/* ====================SET RACE GOAL WATT VALUES==================== */}

        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>Set Race Goal Watt Values</Title>
        </Form.Item>

        <Form.Item label="Intensity Factor (IF)">
          <InputNumber /> % 
          <InputNumber /> watts
        </Form.Item>

        <Form.Item label="Max %FTP">
          <InputNumber /> %
          <InputNumber /> watts
        </Form.Item>

        <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        
      {/* ====================ADVANCED SETTINGS==================== */}

      <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          <Title level={3}>Advanced Settings</Title>
      </Form.Item>


        <Form.Item label="Altitude Power Adjustment">
          <Switch />
        </Form.Item>

        <Form.Item label="Rolling Start">
          <Switch />
        </Form.Item>

        <Form.Item label="Climbing and Descending">
          <Switch />
        </Form.Item>

        <Form.Item label="Set Power Limits">
          <Switch />
        </Form.Item>

        <Form.Item label="Minimum VI">
          <InputNumber /> 
        </Form.Item>


        <Form.Item label="Race Interval Reduction">
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />

        <InputNumber
          min={1}
          max={20}
          style={{
            margin: '0 16px',
          }}
          value={inputValue}
          onChange={onChange}
        />
        </Form.Item>


      </Form>
          
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
          </Footer>
        </Layout>
      </Layout>
    </div>
  );

}

export default AddRace;


