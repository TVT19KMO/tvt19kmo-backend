const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");
const Parent = require("../models/parent");
const cAuth = require("../utils/auth");
const bcrypt = require("bcrypt");
const router = express.Router();
router.use(bodyParser.json());

/*
 *** THIS ROUTE IS FOR TESTING PURPOSE ONLY
 */

router.get("/", (req, res) => {
  Parent.find()
    .populate("tasks")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error: error }));
});

/**
 * [POST] /register
 * Registers a new user.
 */
router.post("/register", async (req, res) => {
  Parent.findOne({ username: req.body.username }, (error, user) => {
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const hash_password = bcrypt.hashSync(req.body.passwordHash, 10);
      const user = new Parent({
        username: req.body.username,
        email: req.body.email,
        passwordHash: hash_password,
      });

      user
        .save()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ error: error }));
    }
  }).catch((error) => res.status(500).json({ error: error }));
});

/**
 * [POST] /login
 * Logins an user.
 */
router.post("/login", async ({ body: { username, password } }, res) => {
  // Fetch user by the given username.
  const user = await Parent.findOne({ username });

  // Check if the user provided correct password.
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // Make sure the user exists and password is correct.
  if (!(user && passwordCorrect)) return res.status(403).json();

  // Return access token and user data.
  res.status(200).send({ token: user.token, user: user });
});

/**
 * async ({ body: { username, password } }, res, next) => {
    // Validate username and password type.
    if (typeof username !== 'string' || typeof password !== 'string')
      next(errors.badRequestError());
    // Fetch user by the given username.
    const user = await User.findOne({ username });
    // Check if the user provided correct password.
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    // Make sure the user exists and password is correct.
    if (!(user && passwordCorrect)) next(errors.unauthorizedError());
    // Return access token and user data.
    res.status(200).send({ token: user.token, user: user });
  }
 */

/*
 *** delete user
 */

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, result) => {
    if (result) {
      return res.status(200).json({ message: "OK" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  });
});

/*
 *** find user by id
 */

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, result) => {
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  });
});

/*
 *** create new user
 */
/*
router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (error, email) => {
    if (email) {
      return res.status(409).json({ message: "Email Already Taken" });
    } else {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        emailVerified: req.body.emailVerified,
        createDate: req.body.createDate,
        role: req.body.role,
        playTime: req.body.playTime,
        tasksDone: req.body.tasksDone,
      });

      user
        .save()
        .then(() => res.status(200).json({ message: "User Created" }))
        .catch(() =>
          res.status(400).json({ error: "Missing Required Information" })
        );
    }
  }).catch((error) => res.status(500).json({ error: error }));
});
*/
/*
*** create new user
*/

router.post('/', /*cAuth.checkAuth,*/ (req, res) => {
    User.findOne({ email: req.body.email }, (error, email) => {
        if(email) {
            return res.status(409).json({message: "Email Already Taken"})
        }
        
        else {
            const user = new User({     
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                dateOfBirth: req.body.dateOfBirth,
                emailVerified: req.body.emailVerified,
                createDate: req.body.createDate,
                role: req.body.role,
                playTime: req.body.playTime,
                tasksDone: req.body.tasksDone,
                balance: req.body.balance
            })
            
            user.save()
            .then(() => res.status(200).json({message: "User Created"}))
            .catch(() => res.status(400).json({error: "Missing Required Information"}))

        }     
    })
    .catch(() => res.status(400).json({ error: "Not found" }));
});


/*
*** update user
*/

router.put('/:id', cAuth.checkAuth, (req, res) => {
    
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(user => {
            firstName = req.body.firstName,
            lastName = req.body.lastName,
            email = req.body.dueDemailate,
            dateOfBirth = req.body.dateOfBirth,
            emailVerified = req.body.emailVerified,
            createDate = req.body.createDate,
            role = req.body.role,
            playTime = req.body.playTime,
            tasksDone = req.body.tasksDone,
            balance = req.body.balance
                
            user.save()
            .then(() => res.status(200).json({message: "OK"}))
            .catch(error => res.status(400).json({error: error}))
        })
        .catch(() => res.status(400).json({error: "Not found"}))    
})


module.exports = router;

