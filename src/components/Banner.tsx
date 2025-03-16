import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../styles/Banner.css";
import Button from '@mui/material/Button';
// Import local images
import carusel01 from "../assets/carusel-img.png";
import carusel02 from "../assets/carusel-img03.png";
import carusel03 from "../assets/carusel-img04.png";
import carusel04 from "../assets/carusel-img05.png";
import carusel05 from "../assets/carusel-img06.png";
import carusel06 from "../assets/carusel-img01.png";
import carusel07 from "../assets/carusel-img07.png";
import carusel08 from "../assets/carusel-img08.png";
import carusel09 from "../assets/carusel-img09.png";
import Heading from "./heading";

const Banner: React.FC = () => {
  const [headingText, setHeadingText] = useState('Category of Comrade')


  // Use media queries:
  // below 792px, use slider mode;
  // below 767px, auto sliding is enabled.
  const isSliderMode = useMediaQuery("(max-width:792px)");
  const isAutoSlide = useMediaQuery("(max-width:767px)");

  // For the 3D carousel (used only on larger screens)
  const translateZValue = 300;

  // Styled Paper component with transparent background
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    backgroundColor: "transparent",
  }));

  // Array of images for the carousel
  const images = [
    carusel01,
    carusel02,
    carusel03,
    carusel09,
    carusel04,
    carusel05,
    carusel06,
    carusel07,
    carusel08,
  ];

  return (
    // banner Section //
    <>
      <div className="bg-img">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <div className="left-div">
            <h2>Buy 2 Get 1 Free</h2>
                <h2 className="comrade">
                The <br />
                Comrade Tea
                </h2>
                <p>Get Free Shipping on all orders under $10.00</p>
            
                <Button variant="contained" style={{background:"#007074"}}> <a href="/products" style={{color:"#ffff", textDecoration:"none"}}>Shop Now</a></Button>         
            </div>
           

        </Grid>
        <Grid item xs={12} md={8}>
            <div className="carousel-container">
              {isSliderMode ? (
                // In slider mode, duplicate items if auto sliding is enabled
                <div className="slider-carousel">
                  {(isAutoSlide ? [...images, ...images] : images).map(
                    (imgSrc, index) => (
                      <div
                        key={index}
                        className="slider-item"
                        style={{ backgroundImage: `url(${imgSrc})` }}
                      ></div>
                    )
                  )}
                </div>
              ) : (
                // 3D rotating carousel for larger screens
                <div className="carousel">
                  {images.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="carousel__face"
                      style={{
                        backgroundImage: `url(${imgSrc})`,
                        transform: `rotateY(${index * 40}deg) translateZ(${translateZValue}px)`,
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
        
        </Grid>
      </Grid>
    </div>
    
  <Heading  text={headingText} width="300px" />

    </>
  

  );
};

export default Banner;
