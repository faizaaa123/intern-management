const express = require("express");
const verifyAccessToken = require("../middleware/verifyjwt");
const authoriseIntern = require("../middleware/authoriseIntern");
const authoriseSupervisor = require("../middleware/authoriseSupervisor");

const {
  getAllSupervisors,
  getOneSupervisor,
  createSupervisor,
  updateSupervisor,
  deleteSupervisor,
} = require("../controllers/superVisorController");
const supervisorRouter = express.Router();


// both interns and supervisors can get a list of supervisors and get one supervisor
supervisorRouter.route("/").get(verifyAccessToken, getAllSupervisors).post(verifyAccessToken, authoriseSupervisor, createSupervisor);
supervisorRouter
  .route("/:id")
  .get(verifyAccessToken, getOneSupervisor)
  .put(verifyAccessToken, authoriseSupervisor, updateSupervisor)
  .delete(verifyAccessToken, authoriseSupervisor, deleteSupervisor);

module.exports = supervisorRouter;
