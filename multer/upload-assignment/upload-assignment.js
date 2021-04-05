import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads/teacher/")) {
      fs.mkdirSync("uploads/teacher");
    }
    if (!fs.existsSync(`uploads/teacher/${req.body.LoggedUser.trim()}`)) {
      fs.mkdirSync(`uploads/teacher/${req.body.LoggedUser.trim()}`);
    }
    if (
      !fs.existsSync(`uploads/teacher/${req.body.LoggedUser.trim()}/assignment`)
    ) {
      fs.mkdirSync(`uploads/teacher/${req.body.LoggedUser.trim()}/assignment`);
    }
    cb(null, `uploads/teacher/${req.body.LoggedUser}/assignment/`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString() +
        file.originalname.split(".")[0].split(" ")[0] +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

const assignmentFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadAssignment = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8, // 8MB
  },
  fileFilter: assignmentFilter,
});