const User = require("../models/User")

const getAllUserProfile = async (req , res) =>{
    try{
        const users= await User.find()
        res.json(users)
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdminStatus = async (req ,res)=>{
    try{
        const isAdmin = await User.findById(req.user.userId)
        if(isAdmin.role==='admin'){
            res.json({isAdmin: false})
        }else{
            res.json({isAdmin: true})
        }
    }catch(error){
        error.status(500).json({error: error.message})
    }
}

module.exports = {getAllUserProfile, updateUserProfile, getAdminStatus}