import React from "react";
import ProfileImg from "../../assets/img/profile_img.png";

const ProfileImage = ({ profileImg }) => {
  return (
    <div className="col s10">
      <img
        src={profileImg ? profileImg : ProfileImg}
        alt=""
        className="circle responsive-img"
      />
    </div>
  );
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
        <div class="row valign-wrapper"> */
