const express = require("express");
const verifyAccessToken = require("../middleware/verifyjwt");
const authoriseIntern = require("../middleware/authoriseIntern");
const authoriseSupervisor = require("../middleware/authoriseSupervisor");


const {
  getAllInterns,
  getOneIntern,
  createIntern,
  updateIntern,
  deleteIntern,
  getByEmailIntern
} = require("../controllers/internController");
const internRouter = express.Router();

//only authorised supervisors can use this route
internRouter.route("/").get(verifyAccessToken, authoriseSupervisor, getAllInterns).post(createIntern);
internRouter
  .route("/:id")
  .get(verifyAccessToken, getOneIntern) //both supervisor and intern 
  .put(verifyAccessToken,updateIntern)  // can access these two routes
  .delete(verifyAccessToken, authoriseSupervisor, deleteIntern); //only superivors can access this route

module.exports = internRouter;