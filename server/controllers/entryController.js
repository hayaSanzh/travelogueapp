const Entry = require("../models/Entry");

const createEntry = async (req, res) => {
    try {
        const userId = req.user.userId;
        const entry = await Entry.create({
            title: req.body.title,
            description: req.body.description,
            travelDate: req.body.travelDate,
            location: req.body.location,
            user: userId
        });
        res.status(201).json(entry);
    } catch (error) {
        console.error('Create Entry Error:', error);
        res.status(400).json({ 
            message: "Failed to create entry",
            error: error.message 
        });
    }
};

const getEntries = async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserEntries = async (req, res) => {
    try {
        const userId = req.user.userId;
        const entries = await Entry.find({ user: userId });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEntryById = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry || entry.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry || entry.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Entry not found" });
        }
        Object.assign(entry, req.body);
        await entry.save();
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry || entry.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Entry not found" });
        }
        await entry.deleteOne();
        res.json({ message: "Entry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createEntry, getEntries, getEntryById, updateEntry, deleteEntry, getUserEntries };