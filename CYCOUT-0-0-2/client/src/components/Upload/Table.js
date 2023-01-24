import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined  } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from 'react-router-dom';
import "../Dashboard/Dashboard.css";
import Upload, {CourseName, Location} from "./Upload";
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

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

// let addTable;

const Tables = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      course: 'CitySpace Competition 0',
      upload_time: '09/9/1999',
      address: 'University of Adelaide no. 0',
    },
    {
      key: '1',
      course: 'CitySpace Competition 1',
      upload_time: '22/2/2022',
      address: 'University of Adelaide no. 1',
    },
  ]);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'course',
      dataIndex: 'course',
      width: '30%',
      editable: true,
    },
    {
      title: 'upload time',
      dataIndex: 'upload_time',
      width: '30%'
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <button> Delete </button>
          </Popconfirm>
        ) : null,
    },
  ];
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const handleAdd = () => {
    const newData = {
      key: count,
      course: CourseName,
      upload_time: date,
      address: Location,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  // addTable = handleAdd;
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  
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
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 16,
                marginTop: 16,
                fontWeight: 'bolder',
                borderRadius: 8,
            
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              Add a course
            </Button>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns}
            />
            <Upload></Upload>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </div>
  );
};

// export {addTable};
export default Tables;
