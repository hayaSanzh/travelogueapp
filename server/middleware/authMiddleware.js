const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
      const user = await User.findById(req.user.id);
      if (!user || user.role !== "admin") {
          return res.status(403).json({ message: "Access denied. Admins only" });
      }
      next();
  } catch (err) {
      res.status(500).json({ message: "Server error" });
  }
};

module.exports = {protect,adminMiddleware};
