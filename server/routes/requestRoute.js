const express = require("express");
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
  getLeaveRequestsByStatus,
} = require("../controllers/requestController");
const requestRouter = express.Router();

requestRouter.route("/").get(getRequests).post(createRequest);
requestRouter
  .route("/:id")
  .get(getRequest)
  .put(updateRequest)
  .delete(deleteRequest);

// requestRouter.route("/:userId").get(getUserRequests);
module.exports = requestRouter;
