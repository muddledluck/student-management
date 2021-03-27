import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutTeacher } from "../../redux/teacher/teacher.actions";
import PropTypes from "prop-types";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutTeacher();
  };

  render() {
    return (
      <div className="navbar">
        {/*  -->  to fix navbar user class 'navbar-fixed' <--  */}
        <nav className="z-depth-0">
          <div className="nav-wrapper  grey darken-3">
            <div>
              <Link
                to="/"
                style={{ fontFamily: "monospace", marginLeft: "20px" }}
                className="col s5 brand-logo left white-text"
              >
                <i className="material-icons">code</i>
                MERN Stack Development
              </Link>
            </div>
            <div className="col s5 pull-s7 right" style={{ width: "40vh" }}>
              <div className="row">
                {!this.props.auth.isAuthenticated ? (
                  <>
                    <div className="col s6">
                      <Link
                        to="/teacher-register"
                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                      >
                        Register as Teacher
                      </Link>
                    </div>
                    <div className="col s6">
                      <Link
                        to="/teacher-login"
                        style={{
                          width: "140px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                        }}
                        className="btn btn-small btn-flat waves-effect hoverable white black-text"
                      >
                        Log In
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="col s6"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Link to="/teacher-profile">
                        <button
                          style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                          }}
                          className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                        >
                          Dashboard
                        </button>
                      </Link>
                    </div>
                    <div className="col s6">
                      <button
                        onClick={this.onLogoutClick}
                        style={{
                          width: "140px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                        }}
                        className="btn btn-small waves-effect waves-light hoverable white black-text"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutTeacher: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.teacherAuth,
  };
};

export default connect(mapStateToProps, { logoutTeacher })(Navbar);
