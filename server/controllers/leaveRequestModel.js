const ErrorResponse = require("../utils/errorResponse");
const LeaveRequest = require("../../models/leaveRequestModel"); // Import your LeaveRequest model
const asyncHandler = require("../middleware/async");

//@desc get all leave requests
//@route GET /api/v1/leave-requests
// @access Private
exports.getAllLeaveRequests = asyncHandler(async (req, res, next) => {
  const leaveRequests = await LeaveRequest.find();
  res.status(200).json({ success: true, count: leaveRequests.length, data: leaveRequests });
});

//@desc get one leave request
//@route GET /api/v1/leave-requests/:id
// @access Private
exports.getOneLeaveRequest = asyncHandler(async (req, res, next) => {
  const leaveRequest = await LeaveRequest.findById(req.params.id);
  if (!leaveRequest) {
    return next(
      new ErrorResponse(`Leave request not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: leaveRequest });
});

//@desc Create leave request
//@route POST /api/v1/leave-requests
// @access Private - only registered users can create.
exports.createLeaveRequest = asyncHandler(async (req, res, next) => {
  const newLeaveRequest = await LeaveRequest.create(req.body);
  res.status(201).json({ success: true, data: newLeaveRequest });
});


//@desc delete one leave request
//@route DELETE /api/v1/leave-requests/:id
// @access Private
exports.deleteLeaveRequest = asyncHandler(async (req, res) => {
  const leaveRequest = await LeaveRequest.findByIdAndDelete(req.params.id);
  if (!leaveRequest) {
    return next(
      new ErrorResponse(`Leave request not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
