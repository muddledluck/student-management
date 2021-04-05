import fs from "fs";
import multer from "multer";

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
export const uploadProfileImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
  fileFilter: imageFilter,
});
