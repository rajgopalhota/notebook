const express = require("express");
const { createUser, loginUser, getUser } = require("../controllers/user");
const router = express.Router();
const { body } = require("express-validator");
var authenticate = require("../middlewares/authenticate");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  createUser
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post("/login", loginUser);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get("/getuser", authenticate, getUser);

module.exports = router;
