const express = require("express");
const router = express.Router();

// @route   GET /v1/user/
// @desc    NOT IMPLEMENTED
// @access  Public
router.get("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(501);
});

module.exports = router;
