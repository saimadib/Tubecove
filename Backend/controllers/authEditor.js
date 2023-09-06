const jwt = require("jsonwebtoken");

const errorMessage=(res) => {
  return res.status(401).json({
    status: "fail",
    message: "Authorization denied, user is not logged in.",
  });
}

const authEditor = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) { 
      return errorMessage(res);
    }
    const verified = jwt.verify(token, process.env.JWT_EDITOR_SECRET);
    if (!verified) {
      return errorMessage(res);
    }
    
    req.user = verified.id;
    next();
  } catch (error) {
    return errorMessage(res);
  }
};

module.exports = authEditor;
