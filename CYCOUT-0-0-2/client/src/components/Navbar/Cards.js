import React from 'react';
import { Col, Row } from 'antd';
import './Cards.css';
import { ThunderboltOutlined, DotChartOutlined, MonitorOutlined, TeamOutlined } from "@ant-design/icons";


function Cards() {
  return (
    <div  className="iconWrapper">
    <Row justify="space-between">
      <Col xs={12} md={4}>
        <DotChartOutlined style={{ fontSize: '10rem', color: '#001529' }} />
        <span className='contentWrapper'>Accurate</span>
      </Col>
      <Col xs={12} md={4}>
        <TeamOutlined style={{ fontSize: '10rem', color: '#001529' }} />
        <span className='contentWrapper'>Reliable</span>
      </Col>
      <Col xs={12} md={4}>
        <MonitorOutlined style={{ fontSize: '10rem', color: '#001529' }}/>
        <span className='contentWrapper'>Portable</span>
      </Col>
      <Col xs={12} md={4}>
        <ThunderboltOutlined style={{ fontSize: '10rem', color: '#001529' }}/>
        <span className='contentWrapper'>Efficient</span>
      </Col>
    </Row>
    </div>
  );
};
export default Cards;