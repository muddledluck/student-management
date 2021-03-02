import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema

const AssignmentByTeacherSchema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  questionPDF: {
    type: String,
    required: true,
  },
  LoggedUser: {
    type: String,
    required: true,
  },
});

const AssignmentByTeacherModel = mongoose.model(
  "assignmentByTeacher",
  AssignmentByTeacherSchema
);

export default AssignmentByTeacherModel;
