const express = require("express");
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");
const requestRouter = express.Router();

requestRouter.route("/").get(getRequests).post(createRequest);
requestRouter
  .route("/:id")
  .get(getRequest)
  .put(updateRequest)
  .delete(deleteRequest);

module.exports = requestRouter;
