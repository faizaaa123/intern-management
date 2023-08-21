const express = require("express");
const {
  getAllInterns,
  getOneIntern,
  createIntern,
  updateIntern,
  deleteIntern,
  getByEmailIntern
} = require("../controllers/internController");
const internRouter = express.Router();

internRouter.route("/").get(getAllInterns).post(createIntern);
internRouter
  .route("/:id")
  .get(getOneIntern)
  .put(updateIntern)
  .delete(deleteIntern);

internRouter.route("/email/:email").get(getByEmailIntern)

module.exports = internRouter;