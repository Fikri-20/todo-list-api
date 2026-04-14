const { verifyAccessToken } = require("../utils/jwt.js");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
