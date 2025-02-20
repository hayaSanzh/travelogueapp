const User = require("../models/User")
const Entry = require("../models/Entry")

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete own admin account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEntries = await Entry.countDocuments();
        
        res.json({
            totalUsers,
            totalEntries
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics' });
    }
}

module.exports = {
    getUsers,
    deleteUser,
    getStats
}