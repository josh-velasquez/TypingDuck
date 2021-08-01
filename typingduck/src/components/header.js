import React from "react";
import Logo from "../assets/rubber-duck.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary menu inverted">
      <div className="item">
        <img className="logo" src={Logo} alt="#" />
      </div>
      <div className="right menu navigation">
        <Link to="/" className="item">
          speed test
        </Link>
        <Link to="/typingtest" className="item">
          typing test
        </Link>
      </div>
    </div>
  );
};

export default Header;
