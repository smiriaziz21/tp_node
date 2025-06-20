const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collection = {
  collectionName: "Student"
};



const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
 
  


},);

const Student = mongoose.model('Student', studentSchema)

module.exports = {
  Student,
  studentSchema,
  collection
}
