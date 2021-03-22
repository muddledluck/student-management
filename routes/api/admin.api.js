import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { keys } from "../../config/keys.config.js";

//Load Teacher model
import TeacherModel from "../../models/teacher.model.js";

//Load Admin model
import AdminModel from "../../models/admin.model.js";

// Load Validators
import validateLoginInput from "../../validation/login.validation.js";
import validateAdminRegisterInput from "../../validation/admin/admin_register.validation.js";
import validateAdminApproveOrDeleteTeacherInput from "../../validation/admin/admin_approve_or_delete_teacher.validation.js";

const AdminRouter = express.Router();

// @route POST api/admin/admin-register
// @dec Register teachers
// @access ADMIN
AdminRouter.post("/admin-register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateAdminRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  AdminModel.findOne({ email }).then((admin) => {
    if (admin) {
      return res.status(400).json({ email: "Email alrady exists" });
    } else {
      const newAdmin = new AdminModel({
        name: name,
        email: email,
        password: password,
      });

      // Hash password before store
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newAdmin.password = hash;
          newAdmin
            .save()
            .then((admin) => res.json(admin))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/admin/admin-login
// @dec Login Admin and return JWT token
// @access ADMIN
AdminRouter.post("/admin-login", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find Admin by email
  AdminModel.findOne({ email }).then((admin) => {
    if (!admin) {
      return res.status(404).json({ emailNotFount: "Email not found" });
    }

    // Check passowrd
    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          ...admin._doc,
        };

        // Sign in token

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              admin: { ...payload },
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password Incorrect" });
      }
    });
  });
});

// @route GET api/admin/get-all-teacher
// @dec GET ALL TEACHER
// @access ADMIN
AdminRouter.get("/get-all-teacher", (req, res) => {
  TeacherModel.find().then((teacher) => {
    res.send(teacher);
  });
});

// @route POST api/admin/approve-teacher
// @dec Approve Teacher
// @access ADMIN
AdminRouter.post("/approve-teacher", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateAdminApproveOrDeleteTeacherInput(
    req.body
  );

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const adminId = req.body.adminId;
  const teacherId = req.body.teacherId;

  AdminModel.findById(adminId).then((admin) => {
    // Check if admin exists
    if (!admin) {
      return res.status(400).json({ adminNotFound: "Admin Not found" });
    } else {
      TeacherModel.findOneAndUpdate(
        { _id: teacherId },
        { adminApproved: true },
        { new: true }
      )
        .then((teacher) => res.status(200).json("Sccuess"))
        .catch((error) => res.json(error));
    }
  });
});

// @route POST api/admin/remove-teacher
// @dec remove Teacher
// @access ADMIN
AdminRouter.post("/remove-teacher", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateAdminApproveOrDeleteTeacherInput(
    req.body
  );

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const adminId = req.body.adminId;
  const teacherId = req.body.teacherId;

  AdminModel.findById(adminId).then((admin) => {
    if (!admin) {
      return res.status(400).json({ adminNotFound: "Admin Not found" });
    } else {
      TeacherModel.findByIdAndDelete(teacherId, function (err, docs) {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(200).json(docs);
        }
      });
    }
  });
});

export default AdminRouter;
