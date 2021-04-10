import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema

const StudentSchema = new Schema({
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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  department: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const StudentModel = mongoose.model("student", StudentSchema);
export default StudentModel;
