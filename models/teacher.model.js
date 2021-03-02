import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  department: {
    type: String,
    required: true,
  },
  assignment: {
    type: [Object],
    ref: "AssignmentByTeacher",
  },
});

const TeacherModel = mongoose.model("teacher", TeacherSchema);
export default TeacherModel;
