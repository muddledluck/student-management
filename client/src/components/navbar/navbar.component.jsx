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
                        style={{
                          minWidth: "200px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                        }}
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
                  <button
                    style={{
                      marginLeft: "25vh",
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                  >
                    Logout
                  </button>
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
