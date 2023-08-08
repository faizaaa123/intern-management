//@desc get all interns
//@route GET /api/v1/interns
// @access Private

exports.getAllInterns = async (req, res) => {
    res.status(200).json({ success: true, message: "Show interns" });
  };
  //@desc get one intern
  //@route GET /api/v1/interns/:id
  // @access Private
  exports.getOneIntern = async (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `Show intern ${req.params.id}` });
  };
  
  //@desc Create intern
  //@route POST /api/v1/interns
  // @access Private - only registered users can create.
  exports.createIntern = async (req, res) => {
    res.status(200).json({ success: true, message: "Intern created" });
  };
  
  //@desc update an intern
  //@route PUT /api/v1/interns/:id
  // @access Private
  exports.updateIntern = async (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `Intern data updated ${req.params.id}` });
  };
  
  //@desc delete one intern
  //@route DELETE /api/v1/interns/:id
  // @access Private
  exports.deleteIntern = async (req, res) => {
    res
      .status(200)
      .json({ success: true, message: `Intern deleted ${req.params.id}` });
  };