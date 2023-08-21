//@desc get all supervisors
//@route GET /api/v1/supervisors
// @access Private
const ErrorResponse = require("../utils/errorResponse");
const Supervisor = require("../models/supervisorModel");
const asyncHandler = require("../middleware/async");

exports.getAllSupervisors = asyncHandler(async (req, res, next) => {
  const supervisors = await Supervisor.find();
  res
    .status(200)
    .json({ success: true, count: supervisors.length, data: supervisors });
});
//@desc get one Supervisor
//@route GET /api/v1/supervisors/:id
// @access Private
exports.getOneSupervisor = asyncHandler(async (req, res, next) => {
  const supervisor = await Supervisor.findById(req.params.id);
  if (!supervisor) {
    return next(
      new ErrorResponse(
        `Supervisor not found with an id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: supervisor });
});

//@desc Create a Supervisor
//@route POST /api/v1/supervisors
// @access Private - only registered supervisors can create.
exports.createSupervisor = asyncHandler(async (req, res, next) => {
  const newSupervisor = await Supervisor.create(req.body);
  res.status(201).json({ success: true, data: newSupervisor });
});

//@desc update an supervisor
//@route PUT /api/v1/supervisors/:id
// @access Private
//TODO: Update supervisor as method does not work
exports.updateSupervisor = asyncHandler(async (req, res, next) => {
  const supervisor = await Supervisor.findById(req.params.id);
  if (!supervisor) {
    return next(
      new ErrorResponse(
        `Supervisor not found with an id of ${req.params.id}`,
        404
      )
    );
  }
  await Supervisor.updateOne(supervisor, req.body);
  const updatedSupervisor = await Supervisor.findById(req.params.id);
  res.status(200).json({ success: true, data: updatedSupervisor });
});

//@desc delete a supervisor
//@route DELETE /api/v1/supervisors/:id
// @access Private
exports.deleteSupervisor = asyncHandler(async (req, res) => {
  const supervisor = await Supervisor.findByIdAndDelete(req.params.id);
  if (!supervisor) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
