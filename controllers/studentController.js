
const mongoose = require('mongoose');
const Student = require('../models/studentModel');


exports.createStudent = async (req, res) => {
  try {
    const { Student} = req.body;


    const student = new Student(Student);
    const saved = await student.save();
    if (!saved) {
      return res.status(400).json({ success: false, error: 'Failed to create student' });
    }
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.error('Error in createStudent:', {
      student: req.body.student,
    
    });
   
    res.status(400).json({ success: false, error: err.message });
  }
};


exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

  

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    console.error(`Error in getStudentById (id: ${req.params.id}):`, {
      message: err.message,
      stack: err.stack,
    });
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: `Validation error: ${err.message}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const { workflow, ...rest } = req.body;
    let workflowId;

    if (workflow && typeof workflow === 'object' && workflow.id) {
      workflowId = workflow.id;
    } else if (typeof workflow === 'string') {
      workflowId = workflow;
    }

    if (!workflowId) {
      const defaultWorkflow = await Workflow.findOne({ isDefault: true });
      if (defaultWorkflow) {
        workflowId = defaultWorkflow._id;
      }
    }

    if (workflowId && !mongoose.Types.ObjectId.isValid(workflowId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid workflow ID format',
      });
    }

    if (rest.lead && rest.lead.userId && !mongoose.Types.ObjectId.isValid(rest.lead.userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid lead user ID format',
      });
    }

    const projectData = {
      ...rest,
      workflow: workflowId || null,
    };

    const updated = await Project.findByIdAndUpdate(req.params.id, projectData, {
      new: true,
    }).populate('workflow');
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Error in updateProject:', {
      id: req.params.id,
      body: req.body,
      message: err.message,
      stack: err.stack,
    });
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: Object.values(err.errors).map((e) => e.message).join(', '),
      });
    }
    if (err.code === 11000) {
      return res.status(400).json({
        error: `Duplicate key error: ${Object.keys(err.keyValue).join(', ')} already exists`,
      });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('workflow');
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    console.error('Error in getProjects:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) {
    console.error(`Error in deleteProject (id: ${req.params.id}):`, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProjectTeam = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('lead.userId', 'username email')
      .populate('team', 'username email role');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const teamMembers = [
      {
        _id: project.lead.userId._id,
        username: project.lead.userId.username,
        email: project.lead.userId.email,
        role: 'Project Lead',
      },
      ...(project.team || []).map((member) => ({
        _id: member._id,
        username: member.username,
        email: member.email,
        role: member.role,
      })),
    ];

    res.status(200).json({
      success: true,
      data: teamMembers,
    });
  } catch (err) {
    console.error(`Error in getProjectTeam (id: ${req.params.id}):`, err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : null,
    });
  }
};