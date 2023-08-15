//@desc get all leave Requests
//@route GET /api/v1/leaveRequests
// @access Private
const ErrorResponse = require("../utils/errorResponse");
const LeaveRequest = require("../models/leaveRequestModel");
const asyncHandler = require("../middleware/async");
const User = require("../models/userModel");
// const User = require("../models/userModel");

exports.getRequests = asyncHandler(async (req, res, next) => {
  const { status } = req.query;
  const requests = await LeaveRequest.find({ status });
  if (!requests) {
    return next(
      new ErrorResponse(`No leave requests found with status: ${status}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, count: requests.length, data: requests });
});
//@desc get one request
//@route GET /api/v1/requests/:id
// @access Private
exports.getRequest = asyncHandler(async (req, res, next) => {
  const request = await LeaveRequest.findById(req.params.id);
  if (!request) {
    return next(
      new ErrorResponse(
        `Leave Request not found with an id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: request });
});

//@desc Create a new requesst
//@route POST /api/v1/requests
// @access Private - only registered LeaveRequests can create.
exports.createRequest = asyncHandler(async (req, res, next) => {
  const newRequest = await LeaveRequest.create(req.body);

  if (newRequest.user) {
    const intern = await User.findById(newRequest.user);

    if (intern) {
      intern.leaveRequests.push(newRequest);
      await intern.save();
    }
  }
  res.status(201).json({ success: true, data: newRequest });
});

//@desc update a request
//@route PUT /api/v1/requests/:id
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const request = await LeaveRequest.findById(req.params.id);
  if (!request) {
    return next(
      new ErrorResponse(`Request not found with an id of ${req.params.id}`, 404)
    );
  }
  await LeaveRequest.updateOne(request, req.body);
  const updatedRequest = await LeaveRequest.findById(req.params.id);
  res.status(200).json({ success: true, data: updatedRequest });
});

//@desc delete one request
//@route DELETE /api/v1/requests/:id
// @access Private
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await LeaveRequest.findByIdAndDelete(req.params.id);
  if (!request) {
    return next(
      new ErrorResponse(
        `Leave Request not found with an id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: {} });
});
