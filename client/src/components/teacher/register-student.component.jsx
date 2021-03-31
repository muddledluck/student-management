import React, { Component } from "react";
import classnames from "classnames";

class RegisterStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      dob: "",
      password: "",
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  updatePassword = () => {
    // const emailSplit = this.state.email.split("@")[0];
    // const fname = this.state.fname;
    // const year = this.state.password.split("-")[0];
    // this.setState({ password: fname + emailSplit + year });
  };
  // "2007-05-26"

  onSubmit = (event) => {
    event.preventDefault();
    const fname = this.state.fname;
    const year = this.state.dob.split("-")[0];
    console.log(this.state, "password: " + fname + "@" + year);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div
              className="col s12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h4>
                <b>Register</b> Student below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  id="fname"
                  type="text"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                />
                <label htmlFor="fname">First Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="lname"
                  type="text"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                />
                <label htmlFor="lname">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                />
                <label htmlFor="email">email</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="dob"
                  type="date"
                  className="datepicker"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                />
                <label htmlFor="dob">Date of Birth</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="text"
                  disabled
                  value={this.state.password}
                />
                <label
                  htmlFor="password"
                  className={classnames("", {
                    active: this.state.password,
                  })}
                >
                  Password (set Automaticaly)
                </label>
              </div>
              <div className="col s12">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterStudent;
