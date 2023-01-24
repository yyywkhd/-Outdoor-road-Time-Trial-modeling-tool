import React from 'react';
import './Slides.css';
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
import Cards from "./Cards";
import image1 from "../../Images/home01.jpg";
import image2 from "../../Images/home02.jpg";
import image3 from "../../Images/home06.jpg";
import image4 from "../../Images/home05.jpg";
import image5 from "../../Images/home04.jpg";


const images = [image1, image2, image3, image4, image5];
const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.7,
    autoplay: true
  };
function Slides() {
    return (
       
            <div className="slide-container">
            <Zoom {...zoomOutProperties}>
                {images.map((each, index) => (
                    <img key={index} style={{ width: "100%" }} src={each} />
                ))}
            </Zoom>
            <Cards></Cards>
            </div>

        
      );
};
export default Slides;