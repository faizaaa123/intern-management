//@desc get all interns
//@route GET /api/v1/interns
// @access Private
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/userModel");
const asyncHandler = require("../middleware/async");
const Supervisor = require("../models/supervisorModel");

exports.getAllInterns = asyncHandler(async (req, res, next) => {
  const interns = await User.find();
  res.status(200).json({ success: true, count: interns.length, data: interns });
});
//@desc get one intern
//@route GET /api/v1/interns/:id
// @access Private
exports.getOneIntern = asyncHandler(async (req, res, next) => {
  const intern = await User.findById(req.params.id);
  if (!intern) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: intern });
});

//@desc Create intern
//@route POST /api/v1/interns
// @access Private - only registered users can create.
//TODO4: Modify it back to allowlisting (email, firstname, lastname and role)
exports.createIntern = asyncHandler(async (req, res, next) => {
  const newIntern = await User.create(req.body);

  if (newIntern.supervisor) {
    const supervisor = await Supervisor.findById(newIntern.supervisor);

    if (supervisor) {
      supervisor.interns.push(newIntern);
      await supervisor.save();
    }
  }
  res.status(201).json({ success: true, data: newIntern });
});

//@desc update an intern
//@route PUT /api/v1/interns/:id
// @access Private
exports.updateIntern = asyncHandler(async (req, res, next) => {
  const intern = await User.findById(req.params.id);
  if (!intern) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  await User.updateOne(intern, req.body);
  const updatedIntern = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: updatedIntern });
});

//@desc delete one intern
//@route DELETE /api/v1/interns/:id
// @access Private
exports.deleteIntern = asyncHandler(async (req, res) => {
  const intern = await User.findByIdAndDelete(req.params.id);
  if (!intern) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
