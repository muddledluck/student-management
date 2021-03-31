import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { keys } from "../../config/keys.config.js";
import fs from "fs";

// Load input validation
import validateTeacherRegisterInput from "../../validation/teacher/teacher_register.validation.js";
import validateLoginInput from "../../validation/login.validation.js";
import validateGetTeacherDetailInput from "../../validation/teacher/teacher_detail.validation.js";
import validateTeacherPostAssignmentInput from "../../validation/teacher/teacher_post_assignment.validation.js";
import validateTeacherDeleteAssignmentInput from "../../validation/teacher/teacher_delete_assignment.validation.js";
import validateTeacherProfileImageUpload from "../../validation/teacher/teacher_profile_image_upload.validation.js";

// Load Teacher model
import TeacherModel from "../../models/teacher.model.js";
import AssignmentByTeacherModel from "../../models/assignmentByTeacher.model.js";

// Setting up Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads/teacher/")) {
      fs.mkdirSync(`uploads/teacher`);
    }
    if (!fs.existsSync(`uploads/teacher/${req.body.LoggedUser.trim()}`)) {
      fs.mkdirSync(`uploads/teacher/${req.body.LoggedUser.trim()}`);
    }
    if (
      !fs.existsSync(
        `uploads/teacher/${req.body.LoggedUser.trim()}/profile-image`
      )
    ) {
      fs.mkdirSync(
        `uploads/teacher/${req.body.LoggedUser.trim()}/profile-image`
      );
    } else {
      fs.readdir(
        `uploads/teacher/${req.body.LoggedUser.trim()}/profile-image`,
        function (err, items) {
          items.forEach((file) => {
            fs.unlink(
              `uploads/teacher/${req.body.LoggedUser.trim()}/profile-image/` +
                file,
              (err) => {
                if (err) throw err;
              }
            );
          });
        }
      );
    }
    cb(null, `uploads/teacher/${req.body.LoggedUser}/profile-image/`);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "." + file.originalname.split(".")[1]);
  },
});

// Filter upload images
const imageFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Multer initilazition
const uploadProfileImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
  fileFilter: imageFilter,
});

const TeacherRouter = express.Router();

// @route POST api/teacher/teacher-register
// @desc Register teachers
// @access Public
TeacherRouter.post("/teacher-register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateTeacherRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  TeacherModel.findOne({ email: req.body.email }).then((teacher) => {
    if (teacher) {
      return res.status(400).json({ email: "Email alredy exists" });
    } else {
      const newTeacher = new TeacherModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
      });

      // Hash password before store
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeacher.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newTeacher.password = hash;
          newTeacher
            .save()
            .then((teacher) => res.json(teacher))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/teacher/teacher-login
// @desc Login Teacher and return JWT token
// @access Public
TeacherRouter.post("/teacher-login", (req, res) => {
  // Form Validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find teacher by email
  TeacherModel.findOne({ email }).then((teacher) => {
    // Check if teacher exists
    if (!teacher) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, teacher.password).then((isMatch) => {
      if (isMatch) {
        // Teacher matched
        // Create JWT Payload
        const payload = {
          ...teacher._doc,
        };

        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              teacher: { ...payload },
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/teacher/teacher-detail
// @desc Get logged in teacher details
// @access Public
TeacherRouter.post("/teacher-detail", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateGetTeacherDetailInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const LoggedUser = req.body.LoggedUser;

  // Find teacher by ID
  TeacherModel.findById(LoggedUser).then((teacher) => {
    // Check teacher exists
    if (!teacher) {
      return res.status(404).json({ userNotFound: "User not found" });
    } else {
      return res.json(teacher);
    }
  });
});

// @route POST api/teacher/post-assignment
// @desc post assignment for student
// @access Teacher
TeacherRouter.post("/post-assignment", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateTeacherPostAssignmentInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newAssignmentByTeacher = new AssignmentByTeacherModel({
      title: req.body.title,
      endDate: req.body.endDate,
      questionPDF: req.body.questionPDF,
      LoggedUser: req.body.LoggedUser,
    });
    newAssignmentByTeacher
      .save()
      .then((assignment) =>
        TeacherModel.findOneAndUpdate(
          { _id: req.body.LoggedUser },
          { $push: { assignment: assignment } },
          { new: true }
        )
      )
      .then((teacher) => res.status(200).json(teacher))
      .catch((error) => res.json(error));
  }
});

// @route POST api/teacher/delete-assignment
// @desc deletefor student
// @access Teacher
TeacherRouter.post("/delete-assignment", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateTeacherDeleteAssignmentInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const LoggedUser = req.body.LoggedUser;
    const assignmentId = req.body.assignmentId;

    AssignmentByTeacherModel.findByIdAndRemove(assignmentId)
      .then((assignment) => {
        if (!assignment) {
          return res.json({ assignment: "Invalid assignmentID" });
        }
        return TeacherModel.findByIdAndUpdate(LoggedUser, {
          $pull: { assignment: assignment },
        })
          .then(() => res.json(true))
          .catch((error) => res.json(error));
      })
      .catch((error) => res.json(error));
  }
});

// @route POST api/teacher/upload-image
// @desc post profile image
// @access Teacher
TeacherRouter.post(
  "/upload-image",
  uploadProfileImage.single("profileImage"),
  (req, res) => {
    // Form Validation
    const { errors, isValid } = validateTeacherProfileImageUpload(req.body);

    // Check Validations
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const LoggedUser = req.body.LoggedUser;
      const profileImage = req.file.path;
      TeacherModel.findByIdAndUpdate(LoggedUser, { profileImage: profileImage })
        .then((teacher) => {
          return res.status(200).json({ teacher: teacher });
        })
        .catch((err) => console.log(err));
    }
  }
);

export default TeacherRouter;