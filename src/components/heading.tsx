import React from "react";
import headingImg from "../assets/heading-img.png";
import "../styles/Heading.css";

type HeadingProps = {
  text: string;
  width?: string; // e.g. "500px", "50%", etc.
};

const Heading: React.FC<HeadingProps> = ({ text, width }) => {
  return (
    <div className="heading" style={{ width }}>
      <img src={headingImg} alt="Heading" />
      <h1>{text}</h1>
    </div>
  );
};

export default Heading;
