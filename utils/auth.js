export const hash = async (req, _, next) => {
    const { password } = req.body;
    // Make sure password is present.
    if (!password) next(errors.badRequestError());
    // Hash the password.
    req['passwordHash'] = await bcrypt.hash(password, config.SALT_ROUNDS);
    // Call next middleware.
    next();
  };