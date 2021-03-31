import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { keys } from "./config/keys.config.js";
import passport from "passport";

import TeacherRouter from "./routes/api/teachers.api.js";
import passportFun from "./config/passport.config.js";
import AdminRouter from "./routes/api/admin.api.js";
const app = express();

//Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

//DB Config
const db = keys.mongoURI;

//Connect to database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Error in connecting \n", error));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportFun(passport);

// Routes
app.get("/", (req, res) => {
  console.log("Server is working....");
  res.send("it is working!!");
});
app.use("/api/teacher", TeacherRouter);
app.use("/api/admin", AdminRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at ${port}`));
