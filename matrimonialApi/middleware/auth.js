const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const getAuth = req.get("Authorization");
  let token;
  if (getAuth) {
    token = getAuth.split(" ")[1];
  } else {
    return res.json({
      status: 401,
      message: "Unauthrized user",
      resultData: null,
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "myspecialsecret");
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
