//@desc get all interns
//@route GET /api/v1/interns
// @access Private
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/userModel");
const asyncHandler = require("../middleware/async");
const bcrypt = require("bcrypt");
const Supervisor = require("../models/supervisorModel");
const verifyJwtAccessToken = require("../middleware/verifyjwt");

exports.getAllInterns = asyncHandler(async (req, res, next) => {
  // middleware for varifying access tokens
  // const accessToken = req.header("Authorization");
  // if (!accessToken || !verifyJwtAccessToken(accessToken)) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }
  // const decoded = verifyJwtAccessToken(accessToken)
  // console.log("this is the decoded token ",decoded)

  // if(decoded.user.role !== "Supervisor") {
  //     return res.status(401).json({ error: 'Unauthorized' });
  // }

  // const data = req.user;

  // console.log("this is req.user.role ", data)

  // if(data.user.role !== "Supervisor") {
  //         return res.status(401).json({ error: 'Unauthorized' });
  // }

  const interns = await User.find();
  res.status(200).json({ success: true, count: interns.length, data: interns });
});
//@desc get one intern
//@route GET /api/v1/interns/:id
// @access Private
exports.getOneIntern = asyncHandler(async (req, res, next) => {
  // const accessToken = req.header("Authorization");
  // if (!accessToken || !verifyJwtAccessToken(accessToken)) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  const intern = await User.findById(req.params.id);

  if (!intern) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: intern });
});

//@desc Create intern
//@route POST /api/v1/interns
// @access Private - only registered users can create.
//TODO4: Modify it back to allowlisting (email, firstname, lastname and role)
exports.createIntern = asyncHandler(async (req, res, next) => {
  const { email, firstname, lastname, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res
      .status(400)
      .json({
        error: "All fields are required. Please fill in the missing fields.",
      });
  }

  const exists = await User.findOne({
    where: {
      email: email,
    },
  });

  if (exists) {
    res.status(400).json({ error: "User already exists" });
  }

  const newIntern = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    role: "intern",
  });
  res.status(201).json({ success: true, data: newIntern });
});

//@desc update an intern
//@route PUT /api/v1/interns/:id
// @access Private
exports.updateIntern = asyncHandler(async (req, res, next) => {
  try {
    const updatedIntern = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          internRole: req.body.internRole,
        },
      },
      { new: true }
    );

    if (!updatedIntern) {
      return next(
        new ErrorResponse(
          `Intern not found with an id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: updatedIntern });
  } catch (error) {
    console.error("Error updating intern:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating intern profile" });
  }
});

//@desc delete one intern
//@route DELETE /api/v1/interns/:id
// @access Private
exports.deleteIntern = asyncHandler(async (req, res) => {
  const intern = await User.findByIdAndDelete(req.params.id);
  if (!intern) {
    return next(
      new ErrorResponse(`Intern not found with an id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
