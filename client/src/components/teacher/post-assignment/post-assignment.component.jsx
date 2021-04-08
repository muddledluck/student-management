import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { postAssignment } from "../../../redux/teacher/teacher.actions";
import "./post-assignment.styles.css";
import classNames from "classnames";

class PostAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      title: "",
      endDate: "",
      minDate: "",
      errors: {},
    };
  }

  componentDidMount() {
    const today = new Date();
    today.setDate(today.getDate() + 7); //atleast 7 day gap for assignment submission
    this.setState({
      minDate: today.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const LoggedUser = this.props.LoggedUser;
    const formData = new FormData();
    formData.append("LoggedUser", LoggedUser);
    formData.append("title", this.state.title);
    formData.append("endDate", this.state.endDate);
    formData.append("assignment", this.state.file);
    console.log({
      LoggedUser: LoggedUser,
      title: this.state.title,
      endDate: this.state.endDate,
      file: this.state.file,
    });
    this.props.postAssignment(formData);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div
              className="col s12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h4>
                <b>Post Assignment</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.onChange}
                  className={classNames("", {
                    invalid: errors.title,
                  })}
                />
                <label htmlFor="title">Title</label>
                <span className="red-text">{errors.title}</span>
              </div>
              <div className="input-field col s12">
                <input
                  id="endDate"
                  type="date"
                  value={this.state.endDate}
                  onChange={this.onChange}
                  min={this.state.minDate}
                  className={classNames("", {
                    invalid: errors.endDate,
                  })}
                />
                <label htmlFor="endDate">End Date</label>
                <span className="red-text">{errors.endDate}</span>
              </div>
              <div className="input-field col s12">
                <div
                  className="file-upload-wrapper"
                  data-text={
                    this.state.file ? this.state.file.name : "Select your file!"
                  }
                >
                  <input
                    id="file"
                    type="file"
                    className="file-upload-field"
                    value=""
                    accept=".doc, .docx, .txt, .pdf"
                    onChange={(e) => this.setState({ file: e.target.files[0] })}
                  />
                </div>
                <span className="red-text">{errors.assignment}</span>
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
                  Post Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostAssignment.propTypes = {
  postAssignment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    LoggedUser: state.teacherAuth.LoggedUser,
    auth: state.teacherAuth,
    errors: state.teacherErrors,
  };
};

export default connect(mapStateToProps, { postAssignment })(PostAssignment);
