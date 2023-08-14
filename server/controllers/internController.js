//@desc get all interns
//@route GET /api/v1/interns
// @access Private
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/userModel");
const asyncHandler = require("../middleware/async");

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
exports.createIntern = asyncHandler(async (req, res, next) => {
  const {email , firstname, lastname} = req.body
  const newIntern = await User.create({
    email,
    firstname,
    lastname, 
    role:"intern"});
  res.status(201).json({ success: true, data: newIntern });
});

//@desc update an intern
//@route PUT /api/v1/interns/:id
// @access Private
exports.updateIntern = asyncHandler(async (req, res, next) => {
  const {firstname,lastname,internRole,supervisor} = req.body
  const intern = await User.findByIdAndUpdate(req.params.id, {firstname,lastname,internRole,supervisor})({
    new: true,
    runValidators: true,
  });
  if (!intern) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: intern });
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
