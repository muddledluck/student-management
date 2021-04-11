import React from "react";
import ProfileImg from "../../assets/img/profile_img.png";
import PropTypes from "prop-types";
import "./profile_image.styles.css";

const ProfileImage = ({ profileImg, changeProfileImage }) => {
  return (
    <>
      <div className="avatar-upload">
        <div className="avatar-edit">
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => changeProfileImage(e)}
          />
          <label htmlFor="imageUpload"></label>
        </div>
        <div className="avatar-preview">
          <img
            alt=""
            id="imagePreview"
            src={profileImg ? profileImg : ProfileImg}
            // style={{ backgroundImage: profileImg ? profileImg : ProfileImg }}
          />
        </div>
      </div>
    </>
  );
};

ProfileImage.propTypes = {
  profileImg: PropTypes.string.isRequired,
  changeProfileImage: PropTypes.func.isRequired,
};

export default ProfileImage;

/* <div class="col s10">
  <span class="black-text">
    This is a square image. Add the "circle" class to it to make it
    appear circular.
  </span>
</div> */

/* <div
      class="col s12 m8 offset-m2 l6 offset-l3"
      style={{ marginLeft: "0%", width: "100%" }}
    >
      <div class="card-panel grey lighten-5 z-depth-1">
        <div class="row valign-wrapper"> 
        */

/* <div className="col s10" style={{ marginLeft: "1vh" }}>
      <img
        src={profileImg ? profileImg : ProfileImg}
        alt=""
        className="circle responsive-img"
        style={{ height: "21vh" }}
      />
  </div> */
