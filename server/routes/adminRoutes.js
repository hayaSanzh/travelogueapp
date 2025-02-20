const express = require('express')
const {getAllUserProfile, updateUserProfile, getAdminStatus} = require('../controllers/adminController')
const {protect,adminMiddleware} = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/profiles", protect, adminMiddleware, getAllUserProfile)
router.put("/profiles/:id", protect, adminMiddleware, updateUserProfile)
router.get("/status", protect, getAdminStatus)

module.exports = router