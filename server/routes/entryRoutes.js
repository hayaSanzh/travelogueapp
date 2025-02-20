const express = require("express");
const { createEntry, getEntries, getEntryById, updateEntry, deleteEntry, getUserEntries } = require("../controllers/entryController");
const {protect} = require("../middleware/authMiddleware")
const Entry = require("../models/Entry");

const router = express.Router();

router.post("/", protect, createEntry);
router.get("/", protect, getEntries);
router.get("/user", protect, getUserEntries)
router.get("/:id", protect, getEntryById);
router.put("/:id", protect, updateEntry);
router.delete("/:id", protect, deleteEntry);

router.get('/user', protect, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user entries' });
  }
});

module.exports = router;