const express = require("express");
const verifyAccessToken = require("../middleware/verifyjwt")


const {
  getAllInterns,
  getOneIntern,
  createIntern,
  updateIntern,
  deleteIntern,
  getByEmailIntern
} = require("../controllers/internController");
const internRouter = express.Router();

internRouter.route("/").get(verifyAccessToken, getAllInterns).post(createIntern);
internRouter
  .route("/:id")
  .get(getOneIntern)
  .put(updateIntern)
  .delete(deleteIntern);

module.exports = internRouter;