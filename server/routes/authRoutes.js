const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/verify', protect, (req, res) => {
  res.json({
    userId: req.user.userId,
    role: req.user.role
  });
});

module.exports = router;
