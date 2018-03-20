import React, { Component } from "react";
import "./About.styl";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  }
  componentDidMount() {
    document
      .getElementById("about-page")
      .addEventListener("touchmove", function(event) {
        event.stopPropagation();
      });

    const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.body.clientHeight, window.innerHeight || 0);
    window.addEventListener("resize", () => {
      const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
      const h = Math.max(document.body.clientHeight, window.innerHeight || 0);
      this.setState({
        width: w,
        height: h
      });
    });
    this.setState({
      width: w,
      height: h
    });
  }
  render() {
    return (
      <div
        className="About"
        id="about-page"
        style={{ height: this.props.height - 100 }}
      >
        <h2>About Us</h2>
        <p>
          At last, a tool for finding better classes. RateMyCourse is a
          collaborative project based in Boulder, CO. Search by any combination
          of course subject, number, and year to find course ratings from
          previous semesters.{" "}
        </p>
        <div className="v2">
          <h2>RateMyCourse 2.0</h2>
          <div className="developers">
            <p>José Cañizares</p>
            <p>Igor Banaszuk</p>
            <p>Harris Freedman</p>
            <p>Software Architect</p>
            <p>Drone Footage Producer</p>
            <p>Logo Designer</p>
          </div>
        </div>
        <div className="v1">
          <h2>RateMyCourse 1.0</h2>
          <div className="developers">
            <p>Igor Banaszuk</p>
            <p>Alec Martin</p>
            <p>Jackson Mediavilla</p>
            <p>Sara Park</p>
            <p>Rohith Chintalapally</p>
            <p>UI/UX Architect</p>
            <p>Backend Developer</p>
            <p>Server-side Developer</p>
            <p>Frontend Developer</p>
            <p>Frontend Developer Leader</p>
          </div>
        </div>
      </div>
    );
  }
}
