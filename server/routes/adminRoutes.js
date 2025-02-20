const express = require('express')
const {getUsers, deleteUser, getStats} = require('../controllers/adminController')
const {protect,admin} = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/verify", protect, admin, (req, res) => {
  res.json({ isAdmin: true })
})

router.get("/users", protect, admin, getUsers)
router.delete("/users/:id", protect, admin, deleteUser)
router.get("/stats", protect, admin, getStats)

module.exports = router