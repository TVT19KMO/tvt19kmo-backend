const jwt = require('jsonwebtoken');
//require('dotenv').config();


// Check authentication

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secretkey');
        req.userData = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).json({Message:'Unauthorized'});     
    }
}




/*


export const hash = async (req, _, next) => {
    const { password } = req.body;
    // Make sure password is present.
    if (!password) next(errors.badRequestError());
    // Hash the password.
    req['passwordHash'] = await bcrypt.hash(password, config.SALT_ROUNDS);
    // Call next middleware.
    next();
  };

*/
module.exports = {
  checkAuth: checkAuth
}