import React, { Component } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./Layout.styl";

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <NavBar />
        <video
          width={this.props.width}
          height={this.props.height - 100}
          autoPlay
          loop
          muted
          playsInline
          poster={require("../media/poster.png")}
        >
          <source
            src={require("../media/ratemycourse_mobile.mp4")}
            type="video/mp4"
          />
        </video>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
