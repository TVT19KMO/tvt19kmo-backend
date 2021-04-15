const express = require("express");
const bodyParser = require("body-parser");
const Login = require("../models/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
router.use(bodyParser.json());

/*
 *** THIS ROUTE IS FOR TESTING PURPOSE ONLY
 */

router.get("/", (req, res) => {
  Login.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error: error }));
});

/*
 *** Register new user
 */

router.post("/register", (req, res) => {
  Login.findOne({ username: req.body.username }, (error, user) => {
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const hash_password = bcrypt.hashSync(req.body.password, 10);
      const user = new Login({
        username: req.body.username,
        password: hash_password,
      });

      user
        .save()
        .then(() => res.status(200).json({ message: "New user registered" }))
        .catch((error) => res.status(400).json({ error: error }));
    }
  }).catch((error) => res.status(500).json({ error: error }));
});

/*
 *** Login user
 */

router.post("/login", (req, res) => {
  Login.findOne({ username: req.body.username }, (error, user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result) {
          // creates access token
          jwt.sign(
            { username: req.body.UserName },
            "secretkey",
            { expiresIn: "1800s" },
            (err, token) => {
              return res.status(200).json({
                Message: "Login successful",
                Token: token,
              });
            }
          );
        } else {
          return res.status(401).json({ message: "Invalid password" });
        }
      });
    } else {
      return res.status(400).json({ message: "Invalid username" });
    }
  }).catch((error) => res.status(500).json({ error: error }));
});

module.exports = router;
