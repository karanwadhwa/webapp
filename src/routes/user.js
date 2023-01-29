const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { dbconn } = require("../config/db");
const authMiddleware = require("../config/authMiddleware");

const router = express.Router();

// @route   GET /v1/user/
// @desc    NOT IMPLEMENTED
// @access  Private
router.get("/", authMiddleware, (req, res) => {
  console.log(req.body);
  return res.sendStatus(501);
});

// @route   POST /v1/user/
// @desc    Create new user
// @access  Public
// @response codes  201, 400
router.post(
  "/",
  check("first_name", "first_name is a required field").not().isEmpty(),
  check("last_name", "last_name is a required field").not().isEmpty(),
  check("username", "username should be a valid email address").isEmail(),
  check("password", "password is a required field").not().isEmpty(),
  check("password", "password needs to be 6 characters or longer").isLength({ min: 6 }),
  (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { username, password, first_name, last_name } = req.body;

    try {
      // check if user already exists
      let selectQuery = "SELECT * FROM users WHERE username = ? LIMIT 1";
      dbconn.query(selectQuery, username, (err, result) => {
        if (err) throw err;
        if (result && result.length > 0)
          return res.status(400).json({ error: "An account with that username already exists." });
        else {
          // encrypt password
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);

          // create user entry in db
          let insertQuery =
            "INSERT INTO users \
            (first_name, last_name, username, password, account_created, account_updated) \
            VALUES (?,?,?,?,?,?); \
            SELECT * FROM users WHERE username = ?";
          dbconn.query(
            insertQuery,
            [first_name, last_name, username, hash, new Date(), new Date(), username],
            (err, result) => {
              // redundant check to avoid 500
              if (err && err.code === "ER_DUP_ENTRY")
                return res.status(400).json({ error: "Username exists" });
              else if (err) throw err;
              // return saved user
              if (result && result.length > 1) {
                let user = result[1][0];
                delete user.password;
                return res.status(201).json({ user });
              }
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(503).json({ error: "Server error: Service Unavailable!!" });
    }
  }
);

// @route   GET /v1/user/:userId
// @desc    Get User details
// @access  Private
// @response codes  200, 401, 403
router.get("/:userId", authMiddleware, (req, res) => {
  if (req.user.id === parseInt(req.params.userId)) return res.status(200).json({ user: req.user });

  return res.status(403).json({ error: "You do not have access to this data" });
});

// @route   PUT /v1/user/:userId
// @desc    Update User details
// @access  Private
// @response codes  204, 400, 401, 403
router.put(
  "/:userId",
  authMiddleware,
  check("first_name", "first_name is a required field").not().isEmpty(),
  check("last_name", "last_name is a required field").not().isEmpty(),
  check("username", "username should be a valid email address").isEmail(),
  check("password", "password is a required field").not().isEmpty(),
  check("password", "password needs to be 6 characters or longer").isLength({ min: 6 }),
  (req, res) => {
    const { username, password, first_name, last_name } = req.body;
    if (req.user.id !== parseInt(req.params.userId) || req.user.username !== username)
      return res.status(403).json({ error: "You do not have access to this data" });

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const queryString = `UPDATE users \
    SET first_name = ?, last_name = ?, password = ?, account_updated = ?\
    WHERE username = ?;`;

    // encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    dbconn.query(
      queryString,
      [first_name, last_name, hash, new Date(), username],
      (err, result) => {
        if (err) throw err;
        if (result) return res.sendStatus(204);
      }
    );
  }
);

module.exports = router;
