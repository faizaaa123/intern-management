const express = require("express");
const verifyAccessToken = require("../middleware/verifyjwt");
const authoriseIntern = require("../middleware/authoriseIntern");
const authoriseSupervisor = require("../middleware/authoriseSupervisor");


const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
  getLeaveRequestsByStatus,
} = require("../controllers/requestController");
const requestRouter = express.Router();

requestRouter.route("/").get(verifyAccessToken, authoriseSupervisor, getRequests).post(verifyAccessToken, authoriseIntern, createRequest);
requestRouter
  .route("/:id")
  .get(verifyAccessToken, getRequest)
  .put(verifyAccessToken, authoriseIntern, updateRequest)
  .delete(verifyAccessToken, authoriseIntern, deleteRequest);

// requestRouter.route("/:userId").get(getUserRequests);
module.exports = requestRouter;
