import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileImage from "../../components/profile_image/profile_image.component";
import RegisterStudent from "../../components/teacher/register-student.component";
import PostAssignment from "../../components/teacher/post-assignment/post-assignment.component";
import { changeProfileImage } from "../../redux/teacher/teacher.actions";

import "./teacher-profile.style.css";
import AllAssignment from "../../components/teacher/all-assignment/all-assignment.component";
// import AllAssignment from "../../components/teacher/all-assignment/all-assignment.component";

class TeacherProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "register_student",
      newImage: "",
    };
  }

  onClickOptions = (e) => {
    this.setState({ selected: e.target.id });
  };

  renderSection = () => {
    switch (this.state.selected) {
      case "register_student":
        return <RegisterStudent />;
      case "post_assignment":
        return <PostAssignment />;
      case "all_assignment":
        return <AllAssignment />;
      case "all_student":
        return "all_student";
      default:
        return "";
    }
  };

  changeProfileImage = (e) => {
    const LoggedUser = this.props.auth.teacher._id;
    e.preventDefault();
    const formData = new FormData();
    formData.append("LoggedUser", LoggedUser);
    formData.append("profileImage", e.target.files[0]);
    this.props.changeProfileImage(formData);
  };

  render() {
    const { teacher } = this.props.auth;
    return (
      <div className="row" style={{ height: "93.2vh" }}>
        <div
          className="col s2  light-blue darken-2"
          style={{
            height: "100%",
            width: "15%",
            padding: "0",
            overflow: "hidden",
          }}
        >
          <ProfileImage
            profileImg={teacher.profileImage}
            changeProfileImage={this.changeProfileImage}
          />
          <div
            className="col s10"
            style={{ padding: "0", margin: "0", width: "100%" }}
          >
            <div
              className={`${
                this.state.selected === "register_student"
                  ? "teacher-section-selected"
                  : "teacher-section-unselected"
              } col s8`}
              onClick={this.onClickOptions}
            >
              <span id="register_student">Register student</span>
            </div>
            <div
              className={`${
                this.state.selected === "post_assignment"
                  ? "teacher-section-selected"
                  : "teacher-section-unselected"
              } col s8`}
              onClick={this.onClickOptions}
            >
              <span id="post_assignment">Post Assignment</span>
            </div>
            <div
              className={`${
                this.state.selected === "all_assignment"
                  ? "teacher-section-selected"
                  : "teacher-section-unselected"
              } col s8`}
              onClick={this.onClickOptions}
            >
              <span id="all_assignment">All Assignment</span>
            </div>
            <div
              className={`${
                this.state.selected === "all_student"
                  ? "teacher-section-selected"
                  : "teacher-section-unselected"
              } col s8`}
              id="post_assignment"
              onClick={this.onClickOptions}
            >
              <span id="all_student">All Student</span>
            </div>
          </div>
        </div>

        <div className="col s9" style={{ height: "100%", width: "85%" }}>
          <div>
            <h1>{teacher.name}</h1>
            <h4>{teacher.department}</h4>
          </div>
          <hr />
          {this.renderSection()}
        </div>
      </div>
    );
  }
}

TeacherProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  changeProfileImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.teacherAuth,
  };
};
export default connect(mapStateToProps, { changeProfileImage })(TeacherProfile);
