import React, { useState, useRef } from "react";
import { message } from 'antd';
import { UploadButton } from '../Button/UploadButton';
import { Row, Col, Form, Input, FormGroup } from "reactstrap";
import GPX from "gpx-parser-builder";
import styled from 'styled-components'
import axios from 'axios';
import './Upload.css';
import {
  InboxOutlined
} from '@ant-design/icons';

const success = () => {
  message.success('Your File Uploaded Successfully!');
};
var next_track_info = {
  track_id: 0,
  point_start_id: 0,
}

var upload_path = {
    "start_id": next_track_info.point_start_id,
    "end_id": 0,
    "user_id": 2,
    "track_id": next_track_info.track_id,
    "track_name":"",
}

const FileName = styled.p.attrs(props => ({
  className: "text-light"
}))`
  font-weight: bold;
  display: flex;
  margin: auto 20px;
`;

const NameSpan = styled.span`
  min-width: ${(props) => (props.file ? "100px" : "0")};
  margin: auto 0;
`;

let CourseName = "";
let Location = "";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [parsed] = useState([]);
  const [uploadName, setUploadName] = useState('');

  let fileReader;

  function handleFileChange(e) {
    console.log("File changes");
    fileReader = new FileReader();
    let ext = e.target.files[0].name.split('.').pop();
    if (ext !== "gpx") {
        alert("Accepts .gpx files only") 
    }  else {
    setUploadName(e.target.files[0].name);
    CourseName = e.target.files[0].name;
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(e.target.files[0]);
    }
  }

  function handleFileRead(e) {
    setFile(fileReader.result);
  }

  function handleSubmit(e) {
    check_track();
    e.preventDefault();
    let gpx = GPX.parse(file);
    if (gpx.trk[0]) {
      upload_path.track_name = gpx.trk[0].name;
      Location = gpx.wpt[0].name;
      upload_path.start_id = next_track_info.point_start_id;
      upload_path.track_id = next_track_info.track_id;
      upload_path.end_id = next_track_info.point_start_id + gpx.trk[0].trkseg[0].trkpt.length;
      axios.post('gpx/track_insert', upload_path);
      for (let i = 0; i < gpx.trk[0].trkseg[0].trkpt.length; i++) {
        var point_name;  
        if(gpx.trk[0].trkseg[0].trkpt[i].name){
           point_name = gpx.trk[0].trkseg[0].trkpt[i].name;
        }else{
            point_name ="";
        }

        var point_insert = {
          "track_id": next_track_info.track_id,
          "pt_id":upload_path.start_id+i,
          "pt_name":point_name,
          "pt_index": i,
          "pt_lon":gpx.trk[0].trkseg[0].trkpt[i].$.lon,
          "pt_lat":gpx.trk[0].trkseg[0].trkpt[i].$.lat
        }
        axios.post('gpx/point_insert', point_insert);
      }
    }
  }

  // function handleClick(index) {
  //   try {
  //     setSelectedPoint(index);
  //   } catch (error) {
  //     alert(error);
  //     setSelectedPoint(null);
  //   }
  // };

  function check_track() {
    // console.log("check_track",track_id_check.current.value);
    axios.get('gpx/get_track_id')
      .then(res => {
        next_track_info.track_id = res.data;
        console.log("track_id",next_track_info.track_id);
      })
    axios.get('gpx/get_point_id')
      .then(res => {
        next_track_info.point_start_id = res.data;
        console.log("point_id",next_track_info.point_start_id);
        next_track_info.point_start_id += 1;
      })
      // next_track_info.start_index = 0;
      console.log("track_id",next_track_info.track_id,"point_id",next_track_info.point_start_id);
  };

  // function track() {
  //   console.log("track_id",next_track_info.track_id,"point_id",next_track_info.point_start_id);
  // }
  
  // console.log(uploadName);
  
  const hiddenFileInput = useRef();

  const handleBrowseClick = (event) => {
    console.log("get meeee");
    check_track();
    hiddenFileInput.current.click();
  };
 
  if (!parsed.length) {
    return (
        <Row>
          <Col xs={12} className="text-center">
            <Form type="inline" onSubmit={handleSubmit}>
              <FormGroup  onClick={handleBrowseClick} style={{ marginLeft: 350}}>
       
                    <Input type="file" id="file_upload"
                    className="upload-container-input"
                        onChange={(e) => handleFileChange(e)}>
                    </Input>
                    <div className="upload-icon">
                      <InboxOutlined style={{ fontSize: "5rem", color: '#3FA9FF'}}/>
                    </div>    
                    <UploadButton onClick={success} className="upload-btn" disabled={file ? false : true}>Upload</UploadButton>
              </FormGroup>
              {/* <FileName>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={"3x"}
                  className="px-2 text-dark"
                />
                <NameSpan file={file} className="text-dark">{uploadName}</NameSpan>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={"3x"}
                  className="px-2 text-dark"
                />
              </FileName>
              <UploadButton onClick={() => console.log(file)} disabled={file ? false : true}>
                Upload
              </UploadButton> */}
            </Form>
          </Col>
        </Row>
    );
  }
}
export {CourseName, Location};
export default UploadFile;
