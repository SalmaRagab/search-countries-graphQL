const jwt = require("jsonwebtoken");

const config = process.env;

const getBearerToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).send(`Please first login, \
    and then add your token in the request headers in order to perform the request!`);
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
};

const verifyToken = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = {
  getBearerToken,
  verifyToken,
};
