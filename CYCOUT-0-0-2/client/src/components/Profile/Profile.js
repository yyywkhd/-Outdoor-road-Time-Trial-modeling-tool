import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined  } from "@ant-design/icons";
// backend communication
import axios from "axios";
// get the identical id of the user
import { getAuth } from "firebase/auth";



import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Typography,
} from 'antd';

import { Breadcrumb, Layout, Menu } from "antd";

import React, { useState } from "react";

import { Link } from 'react-router-dom';
import "./Profile.css";

import $ from 'jquery'; //import jquery


import "./Profile.css";

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




function Profile() {

  const [formInstance] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);


  // const { RangePicker } = DatePicker;
  // const { TextArea } = Input;

  // const submit = () => {
  //   // console.log($("#ff").val());
  //   // alert(JSON.stringify(TextArea));
  //   // console.log(FormItemInput.label);
  //   // formInstance.validateFields().then((vals) => {
  //   //   console.log(JSON.stringify(vals));
      
  //   // });
  //   // $("input[name='aa']").serialize();
  //   // alert($("input").serialize());
  //   // alert($("#experience Select.Option").val());
  //   // alert($("#experience").val());

  //   // alert($('input:radio:checked').val());
  //   alert($("input").serialize() + "&experience="+ $("#experience").val()+"&token=" + new Date().getTime());
  //   alert("Success")
  //   $.ajax({

  //     url: '../userinfo/insert',
  //     type: 'POST',
  //     data: $("input").serialize() + "&experience="+ $("#experience").val()+"&token=" + new Date().getTime(),
  //     dataType: 'json',
  //     success: (result,status,xhr) =>{
  //       // alert(result);
  //       // console.log(result);
  //       // document.write(result);
  //       // eslint-disable-next-line no-undef
  //       if(data(result) === 1){
  //         alert("succ");
  //       }
  //       // eslint-disable-next-line no-undef
  //       alert(data);
  //     },
    
  //     error: (e) => {
        
  //       console.log(e);
  //     }
      
  //   }
  //   );
  // };


  const [first_name, setFristName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [experience, setExperience] = useState(null);
  const [training_eleva, setTrainingEleva] = useState(null);
  const [height, setHeight] = useState(null);

  const [weight, setWeight] = useState(null);
  const [MAX_HR, setMAXHR] = useState(null);
  const [FTP, setFTP] = useState(null);
  const [Gender, setGender] = useState(null);



  // const oncheck = () => {
  //   setFristName("aaaa");
  //   setLastName('www');
  
  //   console.log("wwwww");
  // }

  const submit = () => {
    var form_info = {
      first_name: first_name,
      last_name: last_name,
      birthday: birthday,
      experience: experience,
      training_eleva: training_eleva,
      height: height,
      weight: weight,
      MAX_HR: MAX_HR,
      FTP: FTP,
      Gender: Gender
    }
    console.log("submit called");

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user != null) {
      var uid = user.uid;
      form_info.cloud_id = uid;
      // console.log(uid);
      console.log(form_info);
      axios.post('userinfo/update', form_info);
    }
    else {
      console.log("uid is null not logged in");
      alert("Please log in first");
    }
  }

  const mycheck =() =>{

    const auth = getAuth();
    const user = auth.currentUser;
    // const [first_name, setFristName] = useState(null);
        $.ajax({
  
        url: '../userinfo/list',
        type: 'GET',
        data: {'id':user.uid},
        dataType: 'json',
        success: (result,status,xhr) =>{
          $.each(result.data,function(n,value){
            $("input[name='first_name']").val(value.first_name);
            $("input[name='last_name']").val(value.last_name);
            $("input[name='birthday']").val(value.birthday);
            $("#experience").val(value.experience);
            $("input[name='training_eleva']").val(value.training_eleva);
            $("input[name='height']").val(value.height);
            $("input[name='weight']").val(value.weight);
            $("input[name='MAX_HR']").val(value.MAX_HR);
            $("input[name='FTP']").val(value.FTP);
            $("input[name='Gender'][value='"+value.Gender+"']").prop("checked",true);
            //const tem =JSON.prse(JSON.stringify(value.Gender));
           // this.setGender(tem);
           
  
          });
        }
    });
  }
  const onFinish = (val) =>{
    // formInstance.validateFields().then(val => {alert(val)})
    // formInstance.submit();
    // alert(val);
    // alert($("#myform").serialize());
    // alert(TextArea);
    console.log("val: "+ JSON.stringify(val));
    // $.ajax({

    //   url: 'http://localhost:8081/insert',
    //   type: 'POST',
    //   data: $("input[name='aa']").val(),
    //   dataType: 'json',
    //   success: (data) =>{
        
    //     console.log(data);
    //   },
    
    //   error: (e) => {
        
    //     console.log(e);
    //   }
      
    //   });
    console.log(val)
  }
  // const FormDisabledDemo = () => {
    // const [componentDisabled, setComponentDisabled] = useState(true);
  
    // const onFormLayoutChange = ({ disabled }) => {
    //   setComponentDisabled(disabled);
    // };



  return (

    
    <div>
      <Layout

      onLoad ={mycheck}
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


          {/* ========================================== */}

          {/* <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox> */}
      <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
        <Title level={3}>Athlete Information</Title>
      </Form.Item>
      

      <Form 
      useForm = {formInstance}
      // onFinish = {onFinish} 
      // id = "myform"
      
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        // disabled={componentDisabled}
      >
        {/* <Form.Item label="Chekbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item> */}

        {/* <Form.Item label="First Name" >
          < name = "first_name" />
        </Form.Item> */}

        <Form.Item label="First Name" >
          <Input name = "first_name"
          onChange = {(e) => setFristName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input name = "last_name"
          onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Gender">

          {/* <Radio.Group name = "Gender" onChange = {(e) => setGender(e.target.value)}>
            <Radio value="0"> Male </Radio>
            <Radio value="1"> Female </Radio>
          </Radio.Group> */}

          <input type="radio" name = "Gender"  onChange = {(e) => setGender(e.target.value)}  value="0" />
          <label>Male</label>


          <input type="radio" name = "Gender"  onChange = {(e) => setGender(e.target.value)}  value="1" />
          <label>Female</label>
          
          
         
        </Form.Item>

        <Form.Item label="Experience" >
          <select id = "experience"  onChange = {(e) => setExperience(e.target.value)}>
            <option value="Pro/Elite">Pro/Elite</option>
            <option value="Advanced">Advanced</option>
            <option value="Recreational">Recreational</option>
          </select>
        </Form.Item>

        <Form.Item label="Training Elevation (m)">
          <Input name = "training_eleva"
          onChange = {(e) => setTrainingEleva(e.target.value)}
          /> 
        </Form.Item>
  {/* 
          <Form.Item label="TreeSelect">
            <TreeSelect
              treeData={[
                {
                  title: 'Light',
                  value: 'light',
                  children: [
                    {
                      title: 'Bamboo',
                      value: 'bamboo',
                    },
                  ],
                },
              ]}
            />
          </Form.Item> */}

        <Form.Item label="Height (cm)">
          <InputNumber name = "height"

          onChange = {(e) => setHeight(e)}
          />
        </Form.Item>

        <Form.Item label="Weight (kg)">
          <InputNumber name = "weight"
          onChange = {(e) => setWeight(e)}
          />
        </Form.Item>

        {/* <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item> */}

        <Form.Item label="Date of Birth">
          <DatePicker name = "birthday"
            onChange = {(e) => setBirthday(e)}
          />
        </Form.Item>

        {/* <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item> */}

        <Form.Item wrapperCol={{
          offset: 4,
          span: 16,
        }}>
        <Title level={3}>Calculated Values</Title>
      </Form.Item>

        <Form.Item label="FTP">
          <InputNumber name = "FTP" 
          onChange = {(e) => setFTP(e)}
          />
        </Form.Item>

        <Form.Item label="Max HR">
          <InputNumber name = "MAX_HR"
          onChange = {(e) => setMAXHR(e)}
          />
        </Form.Item>

        <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
          <Button type="primary" htmlType="submit" onClick ={submit}>
          {/* <Button type="primary" htmlType="submit" onClick ={update}> */}
            Submit
          </Button>
        </Form.Item>


      </Form>
          

          {/* ========================================== */}
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </div>
  );

}



export default Profile;
