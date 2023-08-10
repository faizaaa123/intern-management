//@desc get all leave Requests
//@route GET /api/v1/leaveRequests
// @access Private
const ErrorResponse = require("../utils/errorResponse");
const LeaveRequest = require("../models/leaveRequestModel");
const asyncHandler = require("../middleware/async");

exports.getRequests = asyncHandler(async (req, res, next) => {
  const requests = await LeaveRequest.find();
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
  res.status(201).json({ success: true, data: newRequest });
});

//@desc update a request
//@route PUT /api/v1/requests/:id
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const request = await LeaveRequest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
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

//@desc delete one request
//@route DELETE /api/v1/requests/:id
// @access Private
exports.deleteRequest = asyncHandler(async (req, res) => {
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
