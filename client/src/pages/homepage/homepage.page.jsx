import React, { Component } from "react";

class Homepage extends Component {
  render() {
    return (
      <div
        style={{ height: "75vh", maxWidth: "100%", width: "100%" }}
        className="container valign-wrapper"
      >
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>MajorProject</b> using{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              A full-stack app with user authentication via passport and JWTs
            </p>
            <p className="flow-text grey-text text-darken-1">HOMEPAGE</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
