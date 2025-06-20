const router = require("express").Router();
const bcrypt = require("bcrypt");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const {  Student    } = require("../models/studentModel");
const studentController = require("../controllers/studentController");













router.post("/addStudent", async (req, res) => {
  const { name, lastName } = req.body;
  


  try {
  
    if (!name || !lastName ) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide name, lastName." 
      });
    }

    const existingStudent = await Student.findOne({ name });
    if (existingStudent) {
      return res.status(409).json({ 
        success: false,
        message: "A user with this name already exists!" 
      });
    }

   

    // Create user
    const newStudent = new Student({
      name,
      lastName,

    });

    await newStudent.save();

    console.log("New user created:", newStudent);

    // Return success response (without password in production)
    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: {
        studentId: newStudent._id,
        name: newStudent.name,
        lastName: newStudent.lastName
      },
    });

  } catch (err) {
    console.error("Error in addUser endpoint:", err);

    
    res.status(500).json({
      success: false,
      message: "Internal server error while creating user",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});
router.get('/student/:id', studentController.getStudentById);






router.post("/listUsers", async (req, res) => {
  try {
    let users = await Models.Student.find(req.body.filter);
    res.send(users);
  }
  catch (e) { console.log(e); }
});



router.post("/update", async (req, res) => {
  console.log(req.body);
  try {
    await Models.Student.findOneAndUpdate({ name: req.body.name }, { lastName: req.body.lastName });
    console.log(req.body)
    res.send('user Updated Successffully');

  } catch (e) {
    console.log(e);
  }

}

)
router.post("/delete", async (req, res) => {
  try {
    await Models.Student.findOneAndDelete({ _id: req.body._id });
    res.send('user Deleted Successffully');

  } catch (e) {
    console.log(e);
  }

}

)




module.exports = router;
