import React, { useRef, useEffect, useState } from 'react';
import "../Mapbox/Mapbox.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import * as turf from '@turf/turf'
import ChartDataLabels from 'chartjs-plugin-datalabels';
/* adding sidebar for mapbox map start */
import { DesktopOutlined, FileOutlined, PieChartOutlined, AreaChartOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined  } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { Link } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
// import {Chart} from 'react-chartjs-2';
// import {
//   Chart,
//   ArcElement,
//   LineElement,
//   BarElement,
//   PointElement,
//   BarController,
//   BubbleController,
//   DoughnutController,
//   LineController,
//   PieController,
//   PolarAreaController,
//   RadarController,
//   ScatterController,
//   CategoryScale,
//   LinearScale,
//   LogarithmicScale,
//   RadialLinearScale,
//   TimeScale,
//   TimeSeriesScale,
//   Decimation,
//   Filler,
//   Legend,
//   Title,
//   Tooltip,
//   SubTitle,
//   registerables
// } from 'chart.js';

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
import Chart from 'chart.js/auto';
// Chart.register(
//   ArcElement,
//   LineElement,
//   BarElement,
//   PointElement,
//   BarController,
//   BubbleController,
//   DoughnutController,
//   LineController,
//   PieController,
//   PolarAreaController,
//   RadarController,
//   ScatterController,
//   CategoryScale,
//   LinearScale,
//   LogarithmicScale,
//   RadialLinearScale,
//   TimeScale,
//   TimeSeriesScale,
//   Decimation,
//   Filler,
//   Legend,
//   Title,
//   Tooltip,
//   SubTitle,
//   ChartDataLabels,
// );

// Chart.pluginService.register({
//   beforeRender: function(chart) {
//     if (chart.config.options.showAllTooltips) {
//       // create an array of tooltips
//       // we can't use the chart tooltip because there is only one tooltip per chart
//       chart.pluginTooltips = [];
//       /* console.log(chart.config.data.datasets.length) */;
//       chart.config.data.datasets.forEach(function(dataset, i) {
//       	console.log(chart.getDatasetMeta(i).data.length);
//         var values = [1, 4];
//         values.forEach(function(val) {
//         	let sector = chart.getDatasetMeta(i).data[val];
//           chart.pluginTooltips.push(new Chart.Tooltip({
//               _chart: chart.chart,
//               _chartInstance: chart,
//               _data: chart.data,
//               _options: chart.options.tooltips,
//               _active: [sector]
//             }, chart));
//         });
//       });

//       // turn off normal tooltips
//       chart.options.tooltips.enabled = false;
//     }
//   },
//   afterDraw: function(chart, easing) {
//     if (chart.config.options.showAllTooltips) {
//       // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
//       if (!chart.allTooltipsOnce) {
//         if (easing !== 1)
//           return;
//         chart.allTooltipsOnce = true;
//       }

//       // turn on tooltips
//       chart.options.tooltips.enabled = true;
//       Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
//         tooltip.initialize();
//         tooltip.update();
//         // we don't actually need this since we are not animating tooltips
//         tooltip.pivot();
//         tooltip.transition(easing).draw();
//       });
//       chart.options.tooltips.enabled = true;
//     }
//   }
// });

const renderPlugin = {
  beforeRender(chart) {
      //     if (chart.config.options.showAllTooltips) {
      //       // create an array of tooltips
      //       // we can't use the chart tooltip because there is only one tooltip per chart
      //       chart.pluginTooltips = [];
      //       /* console.log(chart.config.data.datasets.length) */;
      //       chart.config.data.datasets.forEach(function(dataset, i) {
      //       	console.log(chart.getDatasetMeta(i).data.length);
      //         var values = [1, 4];
      //         values.forEach(function(val) {
      //         	let sector = chart.getDatasetMeta(i).data[val];
      //           chart.pluginTooltips.push(new Chart.Tooltip({
      //               _chart: chart.chart,
      //               _chartInstance: chart,
      //               _data: chart.data,
      //               _options: chart.options.tooltips,
      //               _active: [sector]
      //             }, chart));
      //         });
      //       });

      //       // turn off normal tooltips
      //       chart.options.tooltips.enabled = false;
      //     }
      //   },
  },
  afterDraw: function(chart, easing) {
    if (chart.config.options.showAllTooltips) {
      // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
      if (!chart.allTooltipsOnce) {
        if (easing !== 1)
          return;
        chart.allTooltipsOnce = true;
      }

      // turn on tooltips
      chart.options.tooltips.enabled = true;
      Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
        tooltip.initialize();
        tooltip.update();
        // we don't actually need this since we are not animating tooltips
        tooltip.pivot();
        tooltip.transition(easing).draw();
      });
      chart.options.tooltips.enabled = true;
    }
  }
}
const { Header, Content, Sider, Footer } = Layout;
function getItem(label, key, icon, children) {
  return {
    key, icon, children,label
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
/* adding sidebar for mapbox map end */

mapboxgl.accessToken = 'pk.eyJ1Ijoibmh1bG9uZzIyMDEiLCJhIjoiY2w3MXIzaWZjMDYxaTNvbTVreGU3YnJ0YSJ9.jScAmsKD7Fw4wieyl_0XgA';

// adding a global variable to keep track of the markers.
var allMarkers = [];

export default function Mapbox() {

  const [collapsed, setCollapsed] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  // 138.92742, 35.37245
  const [lng, setLng] = useState(2);
  const [lat, setLat] = useState(1);
  const [zoom, setZoom] = useState(13);
  const [mapLong, setMapLong] = useState(100)

  const [value, setValue] = useState([5, 20]);
  const [distance, setDistance] = useState(0);
  const minDistance = 1;
  const [datachart, setDatachart] = useState({
    labels: [0, 1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: 'Height',
        fill: 'start',
        data: [5, 1, 10, 15, 9, 10, 12, 5],
        borderColor: 'rgb(75, 192, 192)'
      }
    ]
  });

  const [optionschart, setOptionsChart] = useState({

  })

  const handleChange = (event, newValue,activeThumb) => {
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  var map_coor = []

  var map_upload = [

  ]

  var heights = [5, 1, 10, 15, 9, 10, 12, 5]
  var labels_chart = [0, 1, 2, 3, 4, 5, 6, 7]



  var course_input = {course_id: 2};
  axios.post('course_info/track_info_Sim',course_input)
  .then(res => {
    map_coor = [];
    heights = [];
    labels_chart = [];
    for (var i = 0; i < res.data.length; i++){
      map_coor.push([res.data[i].lon, res.data[i].lat]);
      heights.push(res.data[i].ele);
      labels_chart.push(i);
    }
    // console.log("In here")


    if (!map.current) {

      setLng(map_coor[0][0])
      setLat(map_coor[0][1])
      setMapLong(map_coor.length - 1)
      // console.log("Map init")
      // console.log(lng)
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [map_coor[0][0], map_coor[0][1]],
        zoom: zoom
      });

    }

    setDatachart({
      labels: labels_chart,
      datasets: [
        {
          label: 'Height',
          fill: 'start',
          data: heights,
          borderColor: 'rgb(75, 192, 192)'
        }
      ]
    });
    map.current.on('load', () => {
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': map_coor
          }
        }
      });

      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': 'teal',
          'line-width': 8
        }
      });
    });

    // Delete all markers
    allMarkers.forEach((marker) => marker.remove())
    allMarkers = []

    // Add new markers
    var starting_marker = new mapboxgl.Marker()
      .setLngLat(map_coor[value[0]])
      .addTo(map.current)
    allMarkers.push(starting_marker)
    var dest_marker = new mapboxgl.Marker()
      .setLngLat(map_coor[value[1]])
      .addTo(map.current)
    allMarkers.push(dest_marker)

    // Get distance
    var points = map_coor.slice(value[0], value[1] + 1)
    var line = turf.lineString(points);
    var length = turf.length(line, {units: 'kilometers'});
    setDistance(length)

    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    })
  });

  useEffect(() => {
    // console.log(map_coor.length)
    if (map_coor.length > 0) {
      setMapLong(map_coor.length - 1)
    }
  })

  /* undefine in req.body */
  // Get longitude, latitude and height/elevation
  function get_track(){



    axios.get('gpx/get_track_demo')
    .then(res => {
      map_upload = [];
      for (var i = 0; i < res.data.length; i++){
        map_upload.push([res.data[i].pt_lat, res.data[i].pt_long]);
        heights.push(res.data[i].pt_height);
        labels_chart.push(i);
      }
      // console.log(map_upload);

    });

    // Set data to the chart
    setDatachart({
      labels: labels_chart,
      datasets: [
        {
          label: 'Height',
          fill: 'start',
          data: heights,
          borderColor: 'rgb(75, 192, 192)'
        }
      ]
    });
  }




  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" style={{ color: "white", textAlign: "center" }}>
              <a href={window.location.origin + '/'}>
              <img src={collapsed ? "CYCOUT-logo-bicycle.png" : "CYCOUT-logo-full.png"} style={{width: collapsed ? "50px" : "150px", margin:"10px"}} alt="CYCOUT-logo" />
              </a>
            </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items}/>
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
            <Content style={{ margin: "0 16px" }} >
              <Breadcrumb style={{ margin: "16px 0"}} >
              </Breadcrumb>

              {/* Mapbox map html code */}
              <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Distance: {distance} km
              </div>
              <div ref={mapContainer} className="map-container" style={{ height: "20em" }}/>

              <div style={{ height: "20em" }}>
                <Line data = {datachart} options = {{maintainAspectRatio: false}}/>
              </div>

              <Box sx={{ width: 1000, margin: 1 }}>
                <Slider
                  value={value}
                  onChange={handleChange}
                  // valueLabelDisplay="auto"
                  step={1}
                  min = {0}
                  marks={true}
                  max={mapLong}
                  disableSwap
                  />
              </Box>



              <button onClick={get_track}>Check track</button>
              {/* <button onClick={() => console.log(value)}>Show track</button> */}
              {/* Mapbox map html code end */}
            </Content>
            <Footer/>
          </Layout>
      </Layout>
    </div>
  );
}