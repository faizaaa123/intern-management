const express = require("express");
const {
  getAllSupervisors,
  getOneSupervisor,
  createSupervisor,
  updateSupervisor,
  deleteSupervisor,
} = require("../controllers/superVisorController");
const supervisorRouter = express.Router();

supervisorRouter.route("/").get(getAllSupervisors).post(createSupervisor);
supervisorRouter
  .route("/:id")
  .get(getOneSupervisor)
  .put(updateSupervisor)
  .delete(deleteSupervisor);

module.exports = supervisorRouter;
