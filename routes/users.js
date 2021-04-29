const router = require("express").Router();
const Parent = require("../models/parent");
const { mw, errors } = require("../app/utils");
const bcrypt = require("bcrypt");

/**
 * [GET] /
 * Returns all the users.
 */
router.get("/", async (_, res) => {
  const parents = await Parent.find({});
  res.json({ users: parents });
});

/**
 * [GET] /info
 * Fetches user info.
 */
router.get("/info", [mw.authenticate], async ({ userId }, res) => {
  const user = await Parent.findById(userId);
  res.json({ user });
});

/**
 * [POST] /register
 * Registers a new user.
 */
router.post(
  "/register",
  [mw.hash],
  async ({ body: { username, email }, passwordHash }, res) => {
    // Create a new user.
    const user = new Parent(
      {
        username,
        email,
        passwordHash,
      },
      true
    );

    // Save the user.
    const savedUser = await user.save();

    // Return the newly created user and token.
    res.json({ token: savedUser.token });
  }
);

/**
 * [POST] /login
 * Logins an user.
 */
router.post("/login", async ({ body: { username, password } }, res) => {
  // Validate username and password type.
  if (typeof username !== "string" || typeof password !== "string")
    next(errors.badRequestError());

  // Fetch user by the given username.
  const user = await Parent.findOne({ username });

  // Check if the user provided correct password.
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // Make sure the user exists and password is correct.
  if (!(user && passwordCorrect)) return res.status(403).json();

  // Return access token and user data.
  res.status(200).send({ token: user.token, id: user.id });
});

module.exports = router;
