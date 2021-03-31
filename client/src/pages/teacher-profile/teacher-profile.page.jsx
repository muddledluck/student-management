import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileImage from "../../components/profile_image/profile_image.component";
import RegisterStudent from "../../components/teacher/register-student.component";

class TeacherProfile extends Component {
  render() {
    const { teacher } = this.props.auth;
    return (
      <div className="row" style={{ height: "93.2vh" }}>
        <div
          className="col s2  light-blue darken-2"
          style={{ height: "100%", width: "15%" }}
        >
          <ProfileImage profileImg={teacher.profileImage} />
          <div className="col s10">
            <div className="col s8">
              <span>Register student</span>
            </div>
            <div className="col s8">
              <span>Post Assignment</span>
            </div>
            <div className="col s8">
              <span>All Assignment</span>
            </div>
            <div className="col s8">
              <span>All Student</span>
            </div>
          </div>
        </div>

        <div className="col s9" style={{ height: "100%", width: "85%" }}>
          <div>
            <h1>{teacher.name}</h1>
            <h4>{teacher.department}</h4>
          </div>
          <hr />
          <RegisterStudent />
        </div>
      </div>
    );
  }
}

TeacherProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.teacherAuth,
  };
};
export default connect(mapStateToProps)(TeacherProfile);
