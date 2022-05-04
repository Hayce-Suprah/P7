const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    if (decodedToken) {
      req.userId = decodedToken.userId;
      req.role = decodedToken.role;
      next();
    } else {
      res.status(401).json("You are unauthorized to make this request");
    }
  } catch {
    res.status(401).json("You are unauthorized to make this request");
  }
};
